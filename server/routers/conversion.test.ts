import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "../routers";
import type { TrpcContext } from "../_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("conversion router", () => {
  describe("uploadAndConvert", () => {
    it("should create a conversion record with valid PDF", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // 간단한 base64 인코딩된 테스트 데이터
      const testFileData = Buffer.from("test pdf content").toString("base64");

      const result = await caller.conversion.uploadAndConvert({
        fileName: "test.pdf",
        fileData: testFileData,
        quality: 85,
      });

      expect(result).toBeDefined();
      expect(result.conversionId).toBeDefined();
      expect(result.pageCount).toBeGreaterThan(0);
      expect(result.images).toBeDefined();
      expect(result.quality).toBe(85);
    });

    it("should handle quality parameter correctly", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const testFileData = Buffer.from("test pdf content").toString("base64");

      const result = await caller.conversion.uploadAndConvert({
        fileName: "test.pdf",
        fileData: testFileData,
        quality: 50,
      });

      expect(result.quality).toBe(50);
    });

    it("should use default quality if not provided", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const testFileData = Buffer.from("test pdf content").toString("base64");

      const result = await caller.conversion.uploadAndConvert({
        fileName: "test.pdf",
        fileData: testFileData,
      });

      expect(result.quality).toBe(85); // default
    });
  });

  describe("getConversion", () => {
    it("should retrieve conversion by ID", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // 먼저 변환 생성
      const testFileData = Buffer.from("test pdf content").toString("base64");
      const uploadResult = await caller.conversion.uploadAndConvert({
        fileName: "test.pdf",
        fileData: testFileData,
        quality: 85,
      });

      // 변환 조회
      const getResult = await caller.conversion.getConversion({
        conversionId: uploadResult.conversionId,
      });

      expect(getResult).toBeDefined();
      expect(getResult.id).toBe(uploadResult.conversionId);
      expect(getResult.fileName).toBe("test.pdf");
      expect(getResult.status).toBe("completed");
    });

    it("should throw error for non-existent conversion", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.conversion.getConversion({
          conversionId: 99999,
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("NOT_FOUND");
      }
    });
  });

  describe("getHistory", () => {
    it("should retrieve user's conversion history", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // 변환 생성
      const testFileData = Buffer.from("test pdf content").toString("base64");
      await caller.conversion.uploadAndConvert({
        fileName: "test1.pdf",
        fileData: testFileData,
        quality: 85,
      });

      await caller.conversion.uploadAndConvert({
        fileName: "test2.pdf",
        fileData: testFileData,
        quality: 90,
      });

      // 히스토리 조회
      const history = await caller.conversion.getHistory();

      expect(history).toBeDefined();
      expect(Array.isArray(history)).toBe(true);
      expect(history.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe("generateZipDownload", () => {
    it("should generate ZIP download URL", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      // 먼저 변환 생성
      const testFileData = Buffer.from("test pdf content").toString("base64");
      const uploadResult = await caller.conversion.uploadAndConvert({
        fileName: "test.pdf",
        fileData: testFileData,
        quality: 85,
      });

      // ZIP 생성
      const zipResult = await caller.conversion.generateZipDownload({
        conversionId: uploadResult.conversionId,
      });

      expect(zipResult).toBeDefined();
      expect(zipResult.url).toBeDefined();
      expect(zipResult.fileName).toContain(".zip");
      expect(zipResult.fileName).toContain("test");
    });

    it("should throw error for non-existent conversion", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      try {
        await caller.conversion.generateZipDownload({
          conversionId: 99999,
        });
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.code).toBe("NOT_FOUND");
      }
    });
  });
});
