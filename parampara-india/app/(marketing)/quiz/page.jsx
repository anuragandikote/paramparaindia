import QuizWrapper from "@/components/quiz/QuizWrapper";
import { LPG_SAVINGS_CLAIM } from "@/data/site";

export const metadata = {
  title: "Find Your Perfect Wood Gasifier Stove | Parampara India Quiz",
  description: `Take our 30-second quiz to find the perfect wood gasifier stove for your kitchen. ${LPG_SAVINGS_CLAIM}. Get personalized recommendations and instant savings calculations.`,
  keywords: ["wood gasifier stove quiz", "LPG savings calculator", "kitchen stove finder", "parampara india", "cooking fuel savings"],
  openGraph: {
    title: "Find Your Perfect Stove in 30 Seconds",
    description: `${LPG_SAVINGS_CLAIM} with our personalized stove recommendation quiz`,
    type: "website",
  },
};

export default function QuizPage() {
  return <QuizWrapper />;
}
