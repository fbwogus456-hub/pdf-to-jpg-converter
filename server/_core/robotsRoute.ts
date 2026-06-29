import { type Express } from "express";

/**
 * robots.txt 및 ads.txt 명시적 라우트
 * 정적 파일 서빙보다 우선순위를 가져야 함
 */
export function registerRobotsRoute(app: Express) {
  const robotsContent = `User-agent: *
Allow: /

Sitemap: https://pdf-to-jpg-converter-qtod.onrender.com/sitemap.xml
`;

  const adsContent = `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`;

  app.get("/robots.txt", (_req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.setHeader("Cache-Control", "public, max-age=86400"); // 24시간 캐시
    res.send(robotsContent);
  });

  app.get("/ads.txt", (_req, res) => {
    res.setHeader("Content-Type", "text/plain; charset=UTF-8");
    res.setHeader("Cache-Control", "public, max-age=86400"); // 24시간 캐시
    res.send(adsContent);
  });
}
