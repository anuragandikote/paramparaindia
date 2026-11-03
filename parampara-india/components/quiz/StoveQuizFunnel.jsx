"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getWhatsAppLink } from "@/common/getWhatsappLink";
import { getProductByModel } from "@/data/products";
import { LPG_SAVINGS_CLAIM } from "@/data/site";

const recommend = (model, reason) => {
  const product = getProductByModel(model);
  return {
    model: product.model,
    name: product.name,
    capacity: product.capacityLabel,
    reason,
    savings: 80,
    price: product.priceLabel,
  };
};

// Quiz data and logic
const quizQuestions = [
  {
    id: 1,
    question: "How many people do you typically cook for in one meal?",
    type: "single",
    options: [
      { value: "1-4", text: "1-4 people", next: 2 },
      { value: "5-12", text: "5-12 people", next: 2 },
      { value: "13-25", text: "13-25 people", next: 2 },
      { value: "26-60", text: "26-60 people", next: 2 },
      { value: "61-300", text: "61-300 people", next: 2 },
      { value: "300+", text: "300+ people", next: 2 }
    ]
  },
  {
    id: 2,
    question: "What type of kitchen do you have?",
    type: "single",
    options: [
      { value: "home", text: "Home Kitchen", next: 3 },
      { value: "tea-shop", text: "Tea Shop / Small Eatery", next: 3 },
      { value: "hotel", text: "Hotel / Restaurant", next: 3 },
      { value: "temple", text: "Temple / Community Kitchen", next: 3 },
      { value: "catering", text: "Catering Service", next: 3 },
      { value: "hostel", text: "Hostel / Mess", next: 3 },
      { value: "cloud-kitchen", text: "Cloud Kitchen", next: 3 }
    ]
  },
  {
    id: 3,
    question: "How many hours do you cook per day?",
    type: "single",
    options: [
      { value: "1-2", text: "1-2 hours", next: 4 },
      { value: "3-5", text: "3-5 hours", next: 4 },
      { value: "6-8", text: "6-8 hours", next: 4 },
      { value: "9-12", text: "9-12 hours", next: 4 },
      { value: "12+", text: "12+ hours", next: 4 }
    ]
  },
  {
    id: 4,
    question: "What's your current monthly LPG expense?",
    type: "single",
    options: [
      { value: "1000-3000", text: "₹1,000 - ₹3,000", next: 5 },
      { value: "3000-6000", text: "₹3,000 - ₹6,000", next: 5 },
      { value: "6000-10000", text: "₹6,000 - ₹10,000", next: 5 },
      { value: "10000-20000", text: "₹10,000 - ₹20,000", next: 5 },
      { value: "20000+", text: "₹20,000+", next: 5 }
    ]
  },
  {
    id: 5,
    question: "What type of cooking do you do most?",
    type: "single",
    options: [
      { value: "high-flame", text: "High flame cooking (frying, boiling)", next: 6 },
      { value: "slow-cooking", text: "Slow cooking (curries, gravies)", next: 6 },
      { value: "mixed", text: "Mixed (both high and slow)", next: 6 },
      { value: "bulk", text: "Bulk cooking (large quantities)", next: 6 }
    ]
  },
  {
    id: 6,
    question: "Which city are you located in?",
    type: "input",
    placeholder: "Enter your city name...",
    next: 7
  }
];

const getStoveRecommendation = (answers) => {
  const peopleCount = answers[1];
  const kitchenType = answers[2];

  if (peopleCount === "1-4") {
    return recommend("W1", "Ideal for domestic cooking and small families");
  }

  if (peopleCount === "5-12") {
    if (kitchenType === "hotel" || kitchenType === "catering") {
      return recommend("W1A", "Perfect upgrade from W1 for small commercial use");
    }
    return recommend("W1", "Ideal for domestic cooking and small families");
  }

  if (peopleCount === "13-25") {
    return recommend("W2", "Ideal for hotels, tea shops, and small-scale industries");
  }

  if (peopleCount === "26-60") {
    if (kitchenType === "tea-shop") {
      return recommend("W3", "Designed specifically for tea shops and small hotels");
    }
    return recommend("W3", "Great for medium-sized commercial kitchens");
  }

  if (peopleCount === "61-300") {
    return recommend("W4", "Perfect for hotels, hostels, and temples");
  }

  if (peopleCount === "300+") {
    return recommend("W8", "Industrial-grade for large-scale cooking operations");
  }

  return recommend("W2", "Versatile option for various commercial needs");
};

// Calculate savings
const calculateSavings = (lpgExpense, savingsPercentage) => {
  const monthlySavings = (lpgExpense * savingsPercentage) / 100;
  const yearlySavings = monthlySavings * 12;
  const paybackMonths = 2500 / monthlySavings; // Assuming average stove price

  return {
    monthly: Math.round(monthlySavings),
    yearly: Math.round(yearlySavings),
    payback: Math.ceil(paybackMonths)
  };
};

export default function StoveQuizFunnel() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", phone: "", email: "" });
  const [recommendation, setRecommendation] = useState(null);
  const [savings, setSavings] = useState(null);
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setProgress((currentQuestion / quizQuestions.length) * 100);
  }, [currentQuestion]);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);

    const question = quizQuestions.find(q => q.id === questionId);
    
    // For single choice questions, get the next question from the selected option
    let nextQuestion;
    if (question.type === 'single') {
      const selectedOption = question.options.find(opt => opt.value === answer);
      nextQuestion = selectedOption ? selectedOption.next : questionId + 1;
    } else {
      // For input questions, check if this is the last question
      nextQuestion = questionId + 1;
    }

    // Check if we've reached the end of the quiz
    if (nextQuestion > quizQuestions.length || questionId === quizQuestions.length) {
      // Quiz completed, show lead capture
      setShowLeadCapture(true);
    } else {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    
    // Generate recommendation
    const rec = getStoveRecommendation(answers);
    const lpgExpense = parseInt(answers[4].split('-')[1]); // Extract middle value
    const sav = calculateSavings(lpgExpense, rec.savings);

    setRecommendation(rec);
    setSavings(sav);
    setShowLeadCapture(false);
    setShowResults(true);

    // Track lead generation
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quiz_completed', {
        event_category: 'engagement',
        event_label: rec.model,
        value: lpgExpense
      });
    }
  };

  const getWhatsAppMessage = () => {
    if (!recommendation) return "";
    
    return `Hi! I just took your stove quiz and got recommended: ${recommendation.name}. 
I'm interested in learning more. My details:
Name: ${leadData.name}
Phone: ${leadData.phone}
Location: ${answers[6]}
Current LPG expense: ${answers[4]}`;
  };

  const resetQuiz = () => {
    setCurrentQuestion(1);
    setAnswers({});
    setShowResults(false);
    setShowLeadCapture(false);
    setLeadData({ name: "", phone: "", email: "" });
    setRecommendation(null);
    setSavings(null);
  };

  if (showResults && recommendation && savings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Perfect Stove Match!
            </h1>
            <p className="text-xl text-gray-600">
              Based on your kitchen needs, we found the ideal solution for you
            </p>
          </div>

          {/* Recommendation Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{recommendation.name}</h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {recommendation.capacity}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {LPG_SAVINGS_CLAIM}
                  </span>
                </div>
                <p className="text-gray-600 mb-6">{recommendation.reason}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">Cast iron construction for durability</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">Zero smoke, eco-friendly cooking</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-gray-700">Easy to use and maintain</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Savings Breakdown</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600">Monthly LPG Savings</div>
                    <div className="text-2xl font-bold text-green-600">₹{savings.monthly.toLocaleString()}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600">Yearly LPG Savings</div>
                    <div className="text-2xl font-bold text-green-600">₹{savings.yearly.toLocaleString()}</div>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="text-sm text-gray-600">Investment Payback Period</div>
                    <div className="text-2xl font-bold text-blue-600">{savings.payback} months</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppLink({
                page: "stove_quiz",
                model: recommendation.model,
                message: getWhatsAppMessage()
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Get Price on WhatsApp
            </a>
            <button
              onClick={() => router.push('/products')}
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-orange-200 text-orange-700 font-semibold rounded-full hover:bg-orange-50 transition-all duration-200"
            >
              View All Products
            </button>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={resetQuiz}
              className="text-gray-600 hover:text-gray-800 underline"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showLeadCapture) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost There!</h2>
              <p className="text-gray-600">
                Enter your details to get your personalized stove recommendation and savings calculation
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={leadData.name}
                  onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={leadData.phone}
                  onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={leadData.email}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                See My Results
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              We respect your privacy. Your information will only be used to provide your personalized recommendation.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions.find(q => q.id === currentQuestion);

  // Safety check - if no current question found, reset to first question
  React.useEffect(() => {
    if (!currentQ && !showResults && !showLeadCapture) {
      setCurrentQuestion(1);
    }
  }, [currentQ, showResults, showLeadCapture]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Show Results */}
        {showResults && recommendation && savings && (
          <>
            {/* Results Header */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Your Perfect Stove Match!
              </h1>
              <p className="text-xl text-gray-600">
                Based on your kitchen needs, we found the ideal solution for you
              </p>
            </div>

            {/* Recommendation Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{recommendation.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {recommendation.capacity}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {LPG_SAVINGS_CLAIM}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-6">{recommendation.reason}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Cast iron construction for durability</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Zero smoke, eco-friendly cooking</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-gray-700">Easy to use and maintain</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Your Savings Breakdown</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Monthly LPG Savings</div>
                      <div className="text-2xl font-bold text-green-600">₹{savings.monthly.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Yearly LPG Savings</div>
                      <div className="text-2xl font-bold text-green-600">₹{savings.yearly.toLocaleString()}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <div className="text-sm text-gray-600">Investment Payback Period</div>
                      <div className="text-2xl font-bold text-blue-600">{savings.payback} months</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink({
                  page: "stove_quiz",
                  model: recommendation.model,
                  message: getWhatsAppMessage()
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Get Price on WhatsApp
              </a>
              <button
                onClick={() => router.push('/products')}
                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-orange-200 text-orange-700 font-semibold rounded-full hover:bg-orange-50 transition-all duration-200"
              >
                View All Products
              </button>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={resetQuiz}
                className="text-gray-600 hover:text-gray-800 underline"
              >
                Take Quiz Again
              </button>
            </div>
          </>
        )}

        {/* Show Lead Capture */}
        {showLeadCapture && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Almost There!</h2>
              <p className="text-gray-600">
                Enter your details to get your personalized stove recommendation and savings calculation
              </p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={leadData.name}
                  onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={leadData.phone}
                  onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  value={leadData.email}
                  onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                See My Results
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              We respect your privacy. Your information will only be used to provide your personalized recommendation.
            </p>
          </div>
        )}

        {/* Show Quiz Questions */}
        {!showLeadCapture && !showResults && (
          <>
            {/* Quiz Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Find Your Perfect Stove in 30 Seconds
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get personalized recommendations and calculate your LPG savings
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                Question {currentQuestion} of {quizQuestions.length}
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {currentQ ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {currentQ.question}
                  </h2>

                  {currentQ.type === 'single' ? (
                    <div className="space-y-3">
                      {currentQ.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(currentQ.id, option.value)}
                          className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all duration-200"
                        >
                          <span className="text-gray-800">{option.text}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="text"
                        placeholder={currentQ.placeholder}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim()) {
                            handleAnswer(currentQ.id, e.target.value.trim());
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const input = document.querySelector('input[type="text"]');
                          if (input && input.value.trim()) {
                            handleAnswer(currentQ.id, input.value.trim());
                          }
                        }}
                        className="mt-4 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        Continue
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading question...</p>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 text-center">
              <div className="flex justify-center items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">Free Recommendation</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">Instant Results</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-sm">500+ Happy Customers</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
