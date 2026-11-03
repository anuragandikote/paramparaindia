import { NextResponse } from 'next/server';
import { LPG_SAVINGS_CLAIM } from "@/data/site";

// Temporary in-memory storage for debugging
let leads = [];
let quizHistory = [];

export async function POST(request) {
  try {
    const quizData = await request.json();
    console.log('Received quiz data:', quizData);
    console.log('quizData.quizAnswers:', quizData.quizAnswers);
    console.log('quizData.userDetails:', quizData.userDetails);
    
    // Validate data structure
    if (!quizData.quizAnswers || !quizData.userDetails) {
      console.error('Missing required data:', { quizAnswers: quizData.quizAnswers, userDetails: quizData.userDetails });
      return NextResponse.json(
        { success: false, error: 'Missing required data: quizAnswers or userDetails' },
        { status: 400 }
      );
    }
    
    // Generate CRM format data
    const crmData = {
      leadId: `QUIZ_${Date.now()}`,
      timestamp: new Date().toISOString(),
      source: "Stove Quiz",
      status: "New Lead",
      priority: quizData.quizAnswers['3'] === "hotel" || quizData.quizAnswers['3'] === "temple" ? "High" : "Medium",
      
      contact: {
        name: quizData.userDetails.name,
        phone: quizData.userDetails.phone,
        email: quizData.userDetails.email || "",
        location: quizData.userDetails.city
      },
      
      business: {
        type: quizData.quizAnswers['3'],
        peopleServed: quizData.quizAnswers['1'],
        cookingHours: quizData.quizAnswers['3'],
        cookingStyle: quizData.quizAnswers['5'],
        monthlyLPGExpense: quizData.calculatedValues?.monthlyExpense || 0,
        currentLPGCost: quizData.quizAnswers['3'] === "home" ? 850 : 2500
      },
      
      recommendation: quizData.recommendation,
      
      financials: quizData.savings,
      
      leadScore: {
        total: 0,
        factors: {
          volume: quizData.quizAnswers['1'] === "300+" ? 30 : quizData.quizAnswers['1'] === "61-300" ? 25 : quizData.quizAnswers['1'] === "26-60" ? 20 : 15,
          expense: (quizData.calculatedValues?.monthlyExpense || 0) > 15000 ? 25 : (quizData.calculatedValues?.monthlyExpense || 0) > 8000 ? 20 : 15,
          businessType: quizData.quizAnswers['3'] === "hotel" ? 25 : quizData.quizAnswers['3'] === "temple" ? 20 : 15,
          urgency: quizData.savings?.payback < 3 ? 20 : quizData.savings?.payback < 6 ? 15 : 10
        }
      }
    };
    
    // Calculate total lead score
    crmData.leadScore.total = Object.values(crmData.leadScore.factors).reduce((a, b) => a + b, 0);
    
    console.log('Generated CRM data:', crmData);
    
    // Store in memory (temporary)
    leads.push(crmData);
    quizHistory.push(quizData);
    console.log('Data saved to memory. Total leads:', leads.length);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Lead saved successfully',
      leadId: crmData.leadId 
    });
    
  } catch (error) {
    console.error('Error saving lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save lead: ' + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Use in-memory data (temporary)
    const leadsData = leads;
    
    const { searchParams } = new URL(request.url);
    
    // Filter leads
    let filteredLeads = leadsData;
    
    if (searchParams.search) {
      const searchTerm = searchParams.search.toLowerCase();
      filteredLeads = leadsData.filter(lead => 
        lead.contact.name.toLowerCase().includes(searchTerm) ||
        lead.contact.phone.includes(searchTerm) ||
        lead.contact.location.toLowerCase().includes(searchTerm)
      );
    }
    
    if (searchParams.priority) {
      filteredLeads = filteredLeads.filter(lead => lead.priority === searchParams.priority);
    }
    
    if (searchParams.type) {
      filteredLeads = filteredLeads.filter(lead => lead.business.type === searchParams.type);
    }
    
    return NextResponse.json({
      leads: filteredLeads,
      total: filteredLeads.length,
      stats: {
        totalLeads: leadsData.length,
        highPriority: leadsData.filter(l => l.priority === "High").length,
        hotels: leadsData.filter(l => l.business.type === "hotel").length,
        homes: leadsData.filter(l => l.business.type === "home").length,
        avgScore: leadsData.length > 0 ? Math.round(leadsData.reduce((acc, l) => acc + l.leadScore.total, 0) / leadsData.length) : 0,
        totalSavings: leadsData.reduce((acc, l) => acc + (l.financials?.yearlySavings || 0), 0)
      }
    });
    
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

async function sendEmailNotification(leadData) {
  try {
    const response = await fetch('https://api.resend.com/v1/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer re_1234567890`, // Replace with your Resend API key
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@paramparaindia.com',
        to: 'info@paramparaindia.in', // Replace with your email
        subject: `🔥 New Quiz Lead: ${leadData.contact.name} - ${leadData.business.type}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #ff6b35;">🔥 New Quiz Lead Generated!</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin: 0 0 10px 0;">Lead Details:</h3>
              <p><strong>Name:</strong> ${leadData.contact.name}</p>
              <p><strong>Phone:</strong> ${leadData.contact.phone}</p>
              <p><strong>Email:</strong> ${leadData.contact.email || 'Not provided'}</p>
              <p><strong>Location:</strong> ${leadData.contact.location}</p>
              <p><strong>Business Type:</strong> ${leadData.business.type}</p>
              <p><strong>Priority:</strong> <span style="color: ${leadData.priority === 'High' ? '#dc3545' : '#ffc107'}">${leadData.priority}</span></p>
              <p><strong>Lead Score:</strong> ${leadData.leadScore.total}/100</p>
            </div>
            
            <div style="background: #e9ecef; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin: 0 0 10px 0;">Business Information:</h3>
              <p><strong>People Served:</strong> ${leadData.business.peopleServed}</p>
              <p><strong>Cooking Hours:</strong> ${leadData.business.cookingHours}</p>
              <p><strong>Cooking Style:</strong> ${leadData.business.cookingStyle}</p>
              <p><strong>Monthly LPG Expense:</strong> ₹${leadData.business.monthlyLPGExpense.toLocaleString()}</p>
            </div>
            
            <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin: 0 0 10px 0;">Recommendation:</h3>
              <p><strong>Product:</strong> ${leadData.recommendation.productName}</p>
              <p><strong>Model:</strong> ${leadData.recommendation.productModel}</p>
              <p><strong>Capacity:</strong> ${leadData.recommendation.capacity}</p>
              <p><strong>Savings:</strong> ${LPG_SAVINGS_CLAIM}</p>
            </div>
            
            <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin: 0 0 10px 0;">Financial Impact:</h3>
              <p><strong>Monthly Savings:</strong> ₹${leadData.financials.monthlySavings.toLocaleString()}</p>
              <p><strong>Yearly Savings:</strong> ₹${leadData.financials.yearlySavings.toLocaleString()}</p>
              <p><strong>Payback Period:</strong> ${leadData.financials.paybackPeriod} months</p>
              <p><strong>ROI:</strong> ${leadData.financials.roi}%</p>
            </div>
            
            <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin: 0 0 10px 0;">Lead Scoring:</h3>
              <p><strong>Total Score:</strong> ${leadData.leadScore.total}/100</p>
              <p><strong>Volume Score:</strong> ${leadData.leadScore.factors.volume}</p>
              <p><strong>Expense Score:</strong> ${leadData.leadScore.factors.expense}</p>
              <p><strong>Business Type Score:</strong> ${leadData.leadScore.factors.businessType}</p>
              <p><strong>Urgency Score:</strong> ${leadData.leadScore.factors.urgency}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #6c757d; font-size: 14px;">
                Lead ID: ${leadData.leadId}<br>
                Timestamp: ${new Date(leadData.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        `,
      }),
    });
    
    if (!response.ok) {
      console.error('Failed to send email:', await response.text());
    } else {
      console.log('Email notification sent successfully');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
