import React from 'react';
import PropTypes from 'prop-types';

const Panel = ({ title, role }) => {
  // Admin-specific functionalities
  const renderAdminPanel = () => {
  return (
        <div>
          <button onClick={() => alert('User approved')}>Approve User</button>
          <button onClick={() => alert('User banned')}>Ban User</button>
          <button onClick={() => alert('Project approved')}>Approve Project</button>
          <button onClick={() => alert('Project deleted')}>Delete Project</button>
          <button onClick={() => alert('Dispute resolved')}>Resolve Dispute</button>
          <button onClick={() => alert('Payment processed')}>Process Payment</button>
          <button onClick={() => alert('Freelancer verified')}>Verify Freelancer</button>
          <button onClick={() => alert('Client verified')}>Verify Client</button>
          <button onClick={() => alert('Review approved')}>Approve Review</button>
          <button onClick={() => alert('Review deleted')}>Delete Review</button>
          <button onClick={() => alert('Category added')}>Add Category</button>
          <button onClick={() => alert('Category removed')}>Remove Category</button>
          <button onClick={() => alert('Promotion created')}>Create Promotion</button>
          <button onClick={() => alert('Promotion ended')}>End Promotion</button>
          <button onClick={() => alert('Newsletter sent')}>Send Newsletter</button>
          <button onClick={() => alert('Analytics updated')}>Update Analytics</button>
          <button onClick={() => alert('System backup')}>Backup System</button>
          <button onClick={() => alert('System restore')}>Restore System</button>
          <button onClick={() => alert('API keys regenerated')}>Regenerate API Keys</button>
          <button onClick={() => alert('Audit logs checked')}>Check Audit Logs</button>
          <button onClick={() => alert('User KYC verification')}>KYC Verification</button>
          <button onClick={() => alert('Fraud detection analysis')}>Run Fraud Detection</button>
          <button onClick={() => alert('Initiate A/B testing')}>Initiate A/B Testing</button>
          <button onClick={() => alert('Run machine learning model')}>Run ML Model for Recommendations</button>
          <button onClick={() => alert('Blockchain-based contract creation')}>Create Smart Contract</button>
          <button onClick={() => alert('Real-time analytics update')}>Update Real-time Analytics</button>
          <button onClick={() => alert('Initiate GDPR compliance check')}>GDPR Compliance Check</button>
          <button onClick={() => alert('Run sentiment analysis on reviews')}>Sentiment Analysis on Reviews</button>
          <button onClick={() => alert('Automated tax calculation')}>Calculate Taxes Automatically</button>
          <button onClick={() => alert('Initiate data migration')}>Data Migration</button>
          <button onClick={() => alert('Two-factor authentication setup')}>Setup 2FA for Users</button>
          <button onClick={() => alert('Initiate disaster recovery plan')}>Disaster Recovery</button>
          <button onClick={() => alert('Automate customer support with chatbot')}>Deploy Customer Support Chatbot</button>
          <button onClick={() => alert('Optimize database queries')}>Database Query Optimization</button>
          <button onClick={() => alert('Run SEO audit')}>SEO Audit</button>
          <button onClick={() => alert('Initiate content moderation')}>Content Moderation</button>
          <button onClick={() => alert('Run accessibility compliance check')}>Accessibility Compliance Check</button>
          <button onClick={() => alert('Initiate server scaling')}>Server Auto-Scaling</button>
          <button onClick={() => alert('Run cybersecurity audit')}>Cybersecurity Audit</button>
      </div>
      );
};

  // employee-specific functionalities
  const renderEmployeePanel = () => {
  return (
    <div>
      <h1>Employee Panel</h1>
          <button onClick={() => alert('Review user profile')}>Review User Profile</button>
          <button onClick={() => alert('Review project submission')}>Review Project Submission</button>
          <button onClick={() => alert('Handle customer support ticket')}>Handle Support Ticket</button>
          <button onClick={() => alert('Review payment issues')}>Review Payment Issues</button>
          <button onClick={() => alert('Moderate chat rooms')}>Moderate Chat Rooms</button>
          <button onClick={() => alert('Verify user documents')}>Verify User Documents</button>
          <button onClick={() => alert('Check system logs')}>Check System Logs</button>
          <button onClick={() => alert('Update FAQ section')}>Update FAQ</button>
          <button onClick={() => alert('Review flagged content')}>Review Flagged Content</button>
          <button onClick={() => alert('Send user notifications')}>Send User Notifications</button>
          <button onClick={() => alert('Monitor site performance')}>Monitor Site Performance</button>
          <button onClick={() => alert('Generate daily reports')}>Generate Daily Reports</button>
          <button onClick={() => alert('Update promotional banners')}>Update Promotional Banners</button>
          <button onClick={() => alert('Manage social media posts')}>Manage Social Media Posts</button>
          <button onClick={() => alert('Conduct user surveys')}>Conduct User Surveys</button>
          <button onClick={() => alert('Review user feedback')}>Review User Feedback</button>
          <button onClick={() => alert('Manage email campaigns')}>Manage Email Campaigns</button>
  </div>
  );
};

  // manager-specific functionalities
const renderManagerPanel = () => {
  return (
    <div>
      <h1>Manager Panel</h1>
          <button onClick={() => alert('Approve employee tasks')}>Approve Employee Tasks</button>
          <button onClick={() => alert('Review financial reports')}>Review Financial Reports</button>
          <button onClick={() => alert('Assign projects to teams')}>Assign Projects</button>
          <button onClick={() => alert('Review team performance')}>Review Team Performance</button>
          <button onClick={() => alert('Manage employee schedules')}>Manage Schedules</button>
          <button onClick={() => alert('Initiate team meetings')}>Initiate Team Meetings</button>
          <button onClick={() => alert('Review customer feedback')}>Review Customer Feedback</button>
          <button onClick={() => alert('Approve promotions and discounts')}>Approve Promotions</button>
          <button onClick={() => alert('Review and approve contracts')}>Review Contracts</button>
          <button onClick={() => alert('Monitor platform security')}>Monitor Security</button>
          <button onClick={() => alert('Review legal compliance')}>Review Legal Compliance</button>
          <button onClick={() => alert('Initiate employee training programs')}>Initiate Training Programs</button>
          <button onClick={() => alert('Review and update company policies')}>Update Company Policies</button>
          <button onClick={() => alert('Manage partnerships and collaborations')}>Manage Partnerships</button>
          <button onClick={() => alert('Review and approve marketing campaigns')}>Approve Marketing Campaigns</button>
          <button onClick={() => alert('Oversee dispute resolution')}>Oversee Dispute Resolution</button>
          <button onClick={() => alert('Review and approve system updates')}>Approve System Updates</button>
  </div>
  );
};

  // supervisor-specific functionalities
const renderSupervisorPanel = () => {
  return (
        <div>
          <button onClick={() => alert('Assign tasks to employees')}>Assign Tasks</button>
          <button onClick={() => alert('Review escalated issues')}>Review Escalated Issues</button>
          <button onClick={() => alert('Approve employee leaves')}>Approve Leaves</button>
          <button onClick={() => alert('Generate performance reports')}>Generate Performance Reports</button>
          <button onClick={() => alert('Review financial summaries')}>Review Financial Summaries</button>
          <button onClick={() => alert('Conduct team meetings')}>Conduct Team Meetings</button>
          <button onClick={() => alert('Review audit logs')}>Review Audit Logs</button>
          <button onClick={() => alert('Manage team schedules')}>Manage Team Schedules</button>
          <button onClick={() => alert('Review customer feedback')}>Review Customer Feedback</button>
          <button onClick={() => alert('Approve promotional campaigns')}>Approve Promotions</button>
          <button onClick={() => alert('Oversee dispute resolutions')}>Oversee Dispute Resolutions</button>
          <button onClick={() => alert('Review system updates')}>Review System Updates</button>
          <button onClick={() => alert('Approve content updates')}>Approve Content Updates</button>
          <button onClick={() => alert('Monitor site traffic')}>Monitor Site Traffic</button>
          <button onClick={() => alert('Review security protocols')}>Review Security Protocols</button>
          <button onClick={() => alert('Conduct employee evaluations')}>Conduct Employee Evaluations</button>
          <button onClick={() => alert('Review compliance checks')}>Review Compliance Checks</button>
          <button onClick={() => alert('Manage inventory')}>Manage Inventory</button>
          <button onClick={() => alert('Review partnership proposals')}>Review Partnership Proposals</button>
        </div>
      );
};

// Agency-specific functionalities
const renderAgencyPanel = () => {
  return (
        <div>
          <button onClick={() => alert('New freelancer added to agency')}>Add Freelancer</button>
          <button onClick={() => alert('Freelancer removed from agency')}>Remove Freelancer</button>
          <button onClick={() => alert('Proposal submitted for project')}>Submit Project Proposal</button>
          <button onClick={() => alert('Project marked as completed')}>Mark Project as Completed</button>
          <button onClick={() => alert('Financial report generated')}>Generate Financial Report</button>
          <button onClick={() => alert('Agency profile updated')}>Update Agency Profile</button>
          <button onClick={() => alert('Client onboarded')}>Onboard New Client</button>
          <button onClick={() => alert('Client feedback reviewed')}>Review Client Feedback</button>
          <button onClick={() => alert('Invoice sent to client')}>Send Invoice</button>
          <button onClick={() => alert('Payment received')}>Confirm Payment Received</button>
          <button onClick={() => alert('Contract renewed with client')}>Renew Client Contract</button>
          <button onClick={() => alert('Dispute resolved with client')}>Resolve Client Dispute</button>
          <button onClick={() => alert('Performance metrics reviewed')}>Review Performance Metrics</button>
          <button onClick={() => alert('Marketing campaign launched')}>Launch Marketing Campaign</button>
          <button onClick={() => alert('New service added')}>Add New Service</button>
          <button onClick={() => alert('Service discontinued')}>Discontinue Service</button>
          <button onClick={() => alert('Team meeting scheduled')}>Schedule Team Meeting</button>
          <button onClick={() => alert('Quality assurance check completed')}>Complete QA Check</button>
          <button onClick={() => alert('Client satisfaction survey sent')}>Send Client Satisfaction Survey</button>
          <button onClick={() => alert('Freelancer performance reviewed')}>Review Freelancer Performance</button>
          <button onClick={() => alert('Data backup completed')}>Complete Data Backup</button>
        </div>
      );
};

// Client Business-specific functionalities
const renderBusinessPanel = () => {
  return (
        <div>
          <button onClick={() => alert('New job posted')}>Post New Job</button>
          <button onClick={() => alert('Viewing freelancer proposals')}>View Freelancer Proposals</button>
          <button onClick={() => alert('Freelancer hired')}>Hire Freelancer</button>
          <button onClick={() => alert('Milestone created')}>Create Milestone</button>
          <button onClick={() => alert('Milestone payment made')}>Make Milestone Payment</button>
          <button onClick={() => alert('Project status reviewed')}>Review Project Status</button>
          <button onClick={() => alert('Feedback submitted for freelancer')}>Submit Freelancer Feedback</button>
          <button onClick={() => alert('Project extended')}>Extend Project Deadline</button>
          <button onClick={() => alert('Additional funds added')}>Add Additional Funds</button>
          <button onClick={() => alert('Project closed')}>Close Project</button>
          <button onClick={() => alert('Contract signed')}>Sign Contract</button>
          <button onClick={() => alert('Dispute raised')}>Raise Dispute</button>
          <button onClick={() => alert('Invoice reviewed')}>Review Invoice</button>
          <button onClick={() => alert('Team members invited')}>Invite Team Members</button>
          <button onClick={() => alert('Project documentation uploaded')}>Upload Project Documentation</button>
          <button onClick={() => alert('NDA signed')}>Sign NDA</button>
          <button onClick={() => alert('Freelancer performance evaluated')}>Evaluate Freelancer Performance</button>
          <button onClick={() => alert('Project analytics reviewed')}>Review Project Analytics</button>
          <button onClick={() => alert('Budget reviewed')}>Review Budget</button>
          <button onClick={() => alert('Tax documentation submitted')}>Submit Tax Documentation</button>
          <button onClick={() => alert('Legal compliance checked')}>Check Legal Compliance</button>
        </div>
      );
};

// Client-specific functionalities
const renderClientPanel = () => {
  return (
        <div>
          <button onClick={() => alert('Project posted')}>Post Project</button>
          <button onClick={() => alert('Proposal reviewed')}>Review Proposals</button>
          <button onClick={() => alert('Contract created')}>Create Contract</button>
          <button onClick={() => alert('Payment made')}>Make Payment</button>
          <button onClick={() => alert('Feedback submitted')}>Submit Feedback</button>
          <button onClick={() => alert('Project archived')}>Archive Project</button>
          <button onClick={() => alert('Dispute raised')}>Raise Dispute</button>
          <button onClick={() => alert('Favorites updated')}>Update Favorites</button>
          <button onClick={() => alert('Notification settings updated')}>Update Notification Settings</button>
          <button onClick={() => alert('Inbox checked')}>Check Inbox</button>
          <button onClick={() => alert('Profile updated')}>Update Profile</button>
          <button onClick={() => alert('Download invoice')}>Download Invoice</button>
          <button onClick={() => alert('View analytics')}>View Project Analytics</button>
          <button onClick={() => alert('Referral sent')}>Send Referral</button>
        </div>
  );
};

// Freelancer-specific functionalities
const renderFreelancerPanel = () => {
  return (
        <div>
          <button onClick={() => alert('Viewing client reviews')}>View Client Reviews</button>
          <button onClick={() => alert('Portfolio updated')}>Update Portfolio</button>
          <button onClick={() => alert('Earnings withdrawn')}>Withdraw Earnings</button>
          <button onClick={() => alert('Message sent to client')}>Message Client</button>
          <button onClick={() => alert('Availability updated')}>Update Availability</button>
          <button onClick={() => alert('Skills updated')}>Update Skills</button>
          <button onClick={() => alert('Contract terminated')}>Terminate Contract</button>
          <button onClick={() => alert('Dispute initiated')}>Initiate Dispute</button>
          <button onClick={() => alert('Feedback submitted')}>Submit Feedback</button>
          <button onClick={() => alert('Account settings updated')}>Update Account Settings</button>
        </div>
  );
};

  return (
    <div>
      <h1>{title}</h1>
      {role === 'admin' && renderAdminPanel()}
      {role === 'employee' && renderEmployeePanel()}
      {role === 'manager' && renderManagerPanel()}
      {role === 'supervisor' && renderSupervisorPanel()}
      {role === 'agency' && renderAgencyPanel()}
      {role === 'business' && renderBusinessPanel()}
      {role === 'client' && renderClientPanel()}
      {role === 'freelancer' && renderFreelancerPanel()}
    </div>
  );
};

// Define PropTypes
Panel.propTypes = {
  title: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['admin', 'employee', 'manager', 'supervisor', 'agency', 'business', 'client', 'freelancer']).isRequired
};

export default Panel;
