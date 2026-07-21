import QuizWrapper from "@/components/quiz/QuizWrapper";

export const metadata = {
  title: "Find Your Perfect Wood Gasifier Stove | Parampara India Quiz",
  description: "Take our 30-second quiz to find the perfect wood gasifier stove for your kitchen and save up to 80% on LPG costs. Get personalized recommendations and instant savings calculations.",
  keywords: ["wood gasifier stove quiz", "LPG savings calculator", "kitchen stove finder", "parampara india", "cooking fuel savings"],
  openGraph: {
    title: "Find Your Perfect Stove in 30 Seconds",
    description: "Save up to 80% on cooking fuel with our personalized stove recommendation quiz",
    type: "website",
  },
};

export default function QuizPage() {
  return <QuizWrapper />;
}
