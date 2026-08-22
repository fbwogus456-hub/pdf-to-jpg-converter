import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import JpgToPdf from "./pages/JpgToPdf";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Guides from "./pages/Guides";
import PdfToJpgWhenWhy from "./pages/guides/PdfToJpgWhenWhy";
import JpgVsPng from "./pages/guides/JpgVsPng";
import ScanToImage from "./pages/guides/ScanToImage";
import PdfPageExtraction from "./pages/guides/PdfPageExtraction";
import ImageQuality from "./pages/guides/ImageQuality";
import CombineImagesToPdf from "./pages/guides/CombineImagesToPdf";
import PdfPageSizeOrientation from "./pages/guides/PdfPageSizeOrientation";
import JpgToPdfWhenWhy from "./pages/guides/JpgToPdfWhenWhy";
import About from "./pages/About";
import PdfToImageIphone from "./pages/guides/PdfToImageIphone";
import ReducePdfSize from "./pages/guides/ReducePdfSize";
import SharePdfAsImage from "./pages/guides/SharePdfAsImage";


function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/jpg-to-pdf"} component={JpgToPdf} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/guides"} component={Guides} />
      <Route path={"/about"} component={About} />
      <Route path={"/guides/pdf-to-jpg-when-why"} component={PdfToJpgWhenWhy} />
      <Route path={"/guides/jpg-vs-png"} component={JpgVsPng} />
      <Route path={"/guides/scan-to-image"} component={ScanToImage} />
      <Route path={"/guides/pdf-page-extraction"} component={PdfPageExtraction} />
      <Route path={"/guides/image-quality"} component={ImageQuality} />
      <Route path={"/guides/combine-images-to-pdf"} component={CombineImagesToPdf} />
      <Route path={"/guides/pdf-page-size-orientation"} component={PdfPageSizeOrientation} />
      <Route path={"/guides/jpg-to-pdf-when-why"} component={JpgToPdfWhenWhy} />
      <Route path={"/guides/pdf-to-image-iphone"} component={PdfToImageIphone} />
      <Route path={"/guides/reduce-pdf-size"} component={ReducePdfSize} />
      <Route path={"/guides/share-pdf-as-image"} component={SharePdfAsImage} />




      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster position="top-right" />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
