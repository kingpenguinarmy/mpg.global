import React, { useState } from 'react';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import {
  // Importing Material-UI components
  Card,
  CardActionArea,
  CardContent,
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Tooltip,
  Slider,
  Alert,
} from '@material-ui/core';
import ReactPlayer from 'react-player';

/**
 * State for decentralized identity (DID).
 */
const [did, setDid] = useState(null);

/**
 * State for JSON Web Token (JWT).
 */
const [jwt, setJwt] = useState(null);

/**
 * Creates a decentralized identity and JWT.
 * 
 * @returns {object} An object containing the DID and JWT.
 */
const createDecentralizedIdentity = async () => {
  // Placeholder logic for creating a DID and JWT
  const did = "did:example:123456789abcdefghi";
  const jwt = "your-generated-jwt";
  return { did, jwt };
};

/**
 * SignupForm Component
 * 
 * This component handles the user signup process. It includes form fields for collecting user 
 * information, skills, employment history, education, and certifications. It also provides 
 * functionalities for adding and removing dynamic form fields.
 */
const SignupForm = () => {
  // State for managing the active step in the signup process
  const [activeStep, setActiveStep] = useState(0);

  // State for managing form data
  const [formData, setFormData] = useState({
    skills: [
      // Array for managing user skills and their levels
      { name: 'Graphic Design', level: 0 },
      { name: 'Web Development', level: 0 },
      { name: 'Photography', level: 0 },
      { name: 'Video Editing', level: 0 },
      { name: 'Copywriting', level: 0 }
    ],
    employmentHistory: [
      // Array for managing user's employment history
      { jobTitle: '', company: '', duration: '' }
    ],
    education: [
      // Array for managing user's educational background
      { degree: '', fieldOfStudy: '', yearOfCompletion: '' }
    ],
    certifications: [
      // Array for managing user's certifications
      { name: '', issuingAuthority: '' }
    ],
  });

  // State for managing form errors
  const [errors, setErrors] = useState({});

  // State for managing the user type (e.g., freelancer, client, etc.)
  const [userType, setUserType] = useState('freelancer');

  // State for managing uploaded files
  const [files, setFiles] = useState([]);

  // State for managing file upload errors
  const [fileError, setFileError] = useState(null);

  /**
   * Handles changes to form fields.
   * 
   * @param {Event} e - The event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
 * Handles changes to the user type (e.g., freelancer, client, etc.).
 * 
 * @param {Event} e - The event object.
 */
const handleUserTypeChange = (e) => {
  const value = e.target.value;
  setUserType(value);
};

/**
 * Handles changes to the skill level using a slider.
 * 
 * @param {Event} event - The event object.
 * @param {number} newValue - The new skill level value.
 * @param {number} index - The index of the skill in the skills array.
 */
const handleSkillChange = (event, newValue, index) => {
  const newSkills = [...formData.skills];
  newSkills[index].level = newValue;
  setFormData({ ...formData, skills: newSkills });
};

/**
 * Handles changes to the education fields.
 * 
 * @param {Event} event - The event object.
 * @param {number} index - The index of the education entry in the education array.
 * @param {string} field - The specific field in the education entry (e.g., 'degree', 'fieldOfStudy', 'yearOfCompletion').
 */
const handleEducationChange = (event, index, field) => {
  const newEducation = [...formData.education];
  newEducation[index][field] = event.target.value;
  setFormData({ ...formData, education: newEducation });
};

/**
 * Adds a new education entry to the education array.
 */
const addEducation = () => {
  setFormData({
    ...formData,
    education: [...formData.education, { degree: '', fieldOfStudy: '', yearOfCompletion: '' }]
  });
};

/**
 * Removes an education entry from the education array.
 * 
 * @param {number} index - The index of the education entry to remove.
 */
const removeEducation = (index) => {
  const newEducation = [...formData.education];
  newEducation.splice(index, 1);
  setFormData({ ...formData, education: newEducation });
};

/**
 * Handles changes to the employment history fields.
 * 
 * @param {Event} event - The event object.
 * @param {number} index - The index of the employment history entry in the employmentHistory array.
 * @param {string} field - The specific field in the employment history entry (e.g., 'jobTitle', 'company', 'duration').
 */
const handleEmploymentHistoryChange = (event, index, field) => {
  const newHistory = [...formData.employmentHistory];
  newHistory[index][field] = event.target.value;
  setFormData({ ...formData, employmentHistory: newHistory });
};

/**
 * Adds a new employment history entry to the employmentHistory array.
 */
const addEmployment = () => {
  setFormData({
    ...formData,
    employmentHistory: [...formData.employmentHistory, { jobTitle: '', company: '', duration: '' }],
  });
};

/**
 * Removes an employment history entry from the employmentHistory array.
 * 
 * @param {number} index - The index of the employment history entry to remove.
 */
const removeEmployment = (index) => {
  const updatedHistory = [...formData.employmentHistory];
  updatedHistory.splice(index, 1);
  setFormData({
    ...formData,
    employmentHistory: updatedHistory,
  });
};

/**
 * Handles video uploads and sets the videoIntroduction field in formData.
 * 
 * @param {Event} e - The event object.
 */
const handleVideoUpload = (e) => {
  const file = e.target.files[0];
  const objectUrl = URL.createObjectURL(file);
  setFormData({
    ...formData,
    videoIntroduction: objectUrl,
  });
};

/**
 * Handles file changes and sets the files state.
 * 
 * @param {Event} e - The event object.
 */
const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setFiles(files);
};

/**
 * Handles changes to the social media links and sets the socialMediaLinks field in formData.
 * 
 * @param {Event} e - The event object.
 */
const handleSocialMediaLinksChange = (e) => {
  const value = e.target.value;
  const linksArray = value.split(',');
  setFormData({
    ...formData,
    socialMediaLinks: linksArray,
  });
};

/**
 * Handles changes to the certifications fields.
 * 
 * @param {Event} event - The event object.
 * @param {number} index - The index of the certification entry in the certifications array.
 * @param {string} field - The specific field in the certification entry (e.g., 'name', 'issuingAuthority').
 */
const handleCertificationChange = (event, index, field) => {
  const newCertifications = [...formData.certifications];
  newCertifications[index][field] = event.target.value;
  setFormData({ ...formData, certifications: newCertifications });
};

/**
 * Adds a new certification entry to the certifications array.
 */
const addCertification = () => {
  setFormData({
    ...formData,
    certifications: [...formData.certifications, { name: '', issuingAuthority: '' }],
  });
};

/**
 * Removes a certification entry from the certifications array.
 * 
 * @param {number} index - The index of the certification entry to remove.
 */
const removeCertification = (index) => {
  const updatedCertifications = [...formData.certifications];
  updatedCertifications.splice(index, 1);
  setFormData({
    ...formData,
    certifications: updatedCertifications,
  });
};

  /**
   * Renders the social media links.
   * 
   * @returns {JSX.Element[]} An array of JSX elements representing the social media links.
   */
  const renderSocialMediaLinks = () => {
    return formData.socialMediaLinks.map((link, index) => (
      <div key={index}>
        <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
      </div>
    ));
  };
};

/**
 * Represents the available subscription tiers with their names and prices.
 */
const tiers = [
  { name: 'Freelancer (Free)', price: 'Free' },
  { name: 'Freelancer Pro', price: '$79/Month' },
  { name: 'Agency', price: '$50/User/Month (Minimum 3 Users)' },
  { name: 'Client', price: '$29/Month' },
  { name: 'Business', price: '$19/User/Month (Minimum 3 Users)' },
];

/**
 * Validates the form data based on the current step.
 * 
 * @param {string} step - The name of the current step.
 * @returns {boolean} - Returns true if the form data is valid for the current step, otherwise false.
 */
const validateStep = (step) => {
  const newErrors = {};

  // Validation for the 'Personal Information' step
  if (step === 'Personal Information') {
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long';
    }
  }

  // Validation for the 'Contact Information' step
  if (step === 'Contact Information') {
    const phoneNumberPattern = /^[0-9]{10}$/;
    if (!formData.phoneNumber || !phoneNumberPattern.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    if (!formData.address || formData.address.length < 10) {
      newErrors.address = 'Please enter a valid address';
    }
  }

  // ... (rest of the validation logic for other steps)

  // Update the 'errors' state with the new errors
  setErrors(newErrors);

  // Return true if there are no errors, otherwise false
  return Object.keys(newErrors).length === 0;
};

  // Update the 'errors' state with the new errors
  setErrors(newErrors);

  // Return true if there are no errors, otherwise false
  return Object.keys(newErrors).length === 0;
};

/**
 * Handles the progression to the next step.
 */
const handleNext = async () => {
  // Validate the current step
  if (validateStep(steps[activeStep])) {
    // If it's the last step, handle the final submission
    if (activeStep === steps.length - 1) {
      // Create decentralized identity
      const { did, jwt } = await createDecentralizedIdentity();
      setDid(did);
      setJwt(jwt);

      // Register the user with the backend API
      try {
        const response = await axios.post('https://api.yourplatform.com/users/register', {
          email: formData.email,
          password: formData.password,
          did: did,
          jwt: jwt
        });

        if (response.data.success) {
          console.log('User registered successfully:', response.data.message);
          // Here, you can navigate the user to a dashboard or send a confirmation email
        } else {
          console.log('Failed to register user:', response.data.message);
          // Handle the error appropriately, perhaps show a message to the user
        }
      } catch (error) {
        console.error('An error occurred during registration:', error);
        // Handle the error appropriately
      }
    } else {
      // If it's not the last step, simply progress to the next step
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  } else {
    // If validation fails, errors will be shown due to the setErrors call in validateStep
    console.log('Validation failed for step:', steps[activeStep]);
  }
};

/**
 * Handles the 'Back' button click in the form.
 * Moves the user to the previous step.
 */
const handleBack = () => {
  setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

/**
 * Represents the various steps or stages in the signup or onboarding process.
 * Each step can be a string representing the step's name or an object with a label and sub-steps.
 * Some steps are conditional based on the chosen tier.
 */
const steps = [
  'Subscription Tier Selection',  // Step for selecting the subscription tier.
  'Account Details',              // Step for providing account details.
  'Personal Information',         // Step for entering personal information.
  'Contact Information',          // Step for entering contact details.
  'Business Details',             // Step for providing business-related details.
  'Preferences',                  // Step for setting user preferences.
  'Payment Details',              // Step for entering payment information.
  {
    label: 'Freelancer Verification',  // Step for freelancer verification.
    subSteps: [                       // Sub-steps within the freelancer verification step.
      'Industry Questions',
      'Phone Number',
      'Email',
      'Skills',
      'Availability',
      'Education',
      'Creative Industry Experience',
      'Employment History',
      'Other Experiences', 
      'Base Project Amount',
      'Projects Per Week',
      'Portfolio',
      'Video Introduction',
      'Certifications',
      'Volunteering',
      'Social Media Links',
      'Review'
    ]
  },
  chosenTier === 'Agency' ? 'Agency Verification' : null,          // Conditional step for agency verification.
  chosenTier === 'Client' ? 'Client Specific Questions' : null,    // Conditional step for client-specific questions.
  chosenTier === 'Client' ? 'ACH "Plaid" Payment' : null,          // Conditional step for client's ACH payment.
  chosenTier === 'Business' ? 'Business Specific Questions' : null,// Conditional step for business-specific questions.
  chosenTier === 'Business' ? 'ACH "Plaid" Payment' : null         // Conditional step for business's ACH payment.
].filter(Boolean);  // Filters out any null values to ensure only valid steps are included.

/**
 * An array of sub-steps for the freelancer verification process.
 */
const freelancerVerificationSubSteps = [
  'Industry Questions',
  'Phone Number',
  'Email',
  'Skills',
  'Availability',
  'Education',
  'Creative Industry Experience',
  'Employment History',
  'Other Experiences',
  'Base Project Amount',
  'Projects Per Week',
  'Portfolio',
  'Video Introduction',
  'Certifications',
  'Volunteering',
  'Social Media Links',
  'Review'
];
/**
 * JSX rendering for the 'Payment Details' step.
 */
case 'Payment Details':
  /**
   * Callback function executed upon successful bank account linking.
   * @param {string} public_token - The public token generated by Plaid.
   * @param {object} metadata - Additional metadata related to the linking process.
   */
  const onSuccess = (public_token, metadata) => {
    // send public_token to your app server
    console.log('Public Token: ', public_token);
    console.log('Metadata: ', metadata);
  };
/**
 * Handles the exit event for the Plaid Link interface.
 * This function is triggered when the user exits the Plaid Link flow before completion.
 *
 * @param {Error|null} err - An error object if an error occurred, or null if no error.
 * @param {object} metadata - Additional metadata related to the exit event.
 * @property {string} metadata.status - A string indicating the status of the Link session. Can be one of the following: "requires_credentials", "choose_account", "requires_code", "verification_expired", etc.
 * @property {string} metadata.institution - Information about the bank institution that the user selected.
 * @property {string} metadata.link_session_id - A unique identifier for the Link session.
 * @property {string} metadata.request_id - A unique identifier for the last request made. Useful for troubleshooting with Plaid support.
 */
const onExit = (err, metadata) => {
  if (err) {
    // Log the error for debugging purposes
    console.error('Error while linking bank account:', err);
  }

  // Handle the exit based on the status
  switch (metadata.status) {
    case 'requires_credentials':
      console.log('User needs to provide more credentials.');
      break;
    case 'choose_account':
      console.log('User exited while choosing an account.');
      break;
    case 'requires_code':
      console.log('User needs to provide a verification code.');
      break;
    case 'verification_expired':
      console.log('Verification has expired.');
      break;
    default:
      console.log('User exited the Plaid Link flow:', metadata.status);
  }
};

  // Configuration for initializing the Plaid Link
  const config = {
    token: 'your-generated-link-token',
    onSuccess,
    onExit,
  };

  // Hook to open the Plaid Link interface
  const openLink = usePlaidLink(config);

const getStepContent = (step) => {
  switch (step) {
    case 'Subscription Tier Selection':
      // JSX for selecting a subscription tier
      return (
        <Grid container spacing={3}>
          {tiers.map((tier, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card onClick={() => setChosenTier(tier.name)}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {tier.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {tier.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    case 'Account Details':
      // JSX for inputting account details
      return (
        <div>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            error={!!errors.username}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            error={!!errors.password}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            error={!!errors.confirmPassword}
          />
        </div>
      );
    case 'Personal Information':
      // JSX for inputting personal information
      return (
        <div>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={!!errors.fullName}
          />
          <TextField
            label="Date of Birth"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            error={!!errors.dob}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              label="Gender"
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              error={!!errors.gender}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </div>
      );
    case 'Contact Information':
      // JSX for inputting contact information
      return (
        <div>
          <TextField
            label="Contact Person"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            error={!!errors.contactPerson}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            error={!!errors.phoneNumber}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            error={!!errors.address}
          />
        </div>
      );
    case 'Business Details':
      // JSX for inputting business-related details
      return (
        <div>
          <TextField
            label="Company Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            error={!!errors.companyName}
          />
          <TextField
            label="Industry"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            error={!!errors.industry}
          />
          <TextField
            label="Number of Employees"
            variant="outlined"
            fullWidth
            type="number"
            onChange={(e) => setFormData({ ...formData, numEmployees: e.target.value })}
            error={!!errors.numEmployees}
          />
          <TextField
            label="Business Email"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
            error={!!errors.businessEmail}
          />
          <TextField
            label="Business Phone"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, businessPhone: e.target.value })}
            error={!!errors.businessPhone}
          />
        </div>
      );
    case 'Preferences':
      // JSX for setting user preferences
      return (
        <div>
          <TextField
            label="Preferred Language"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, language: e.target.value })}
            error={!!errors.language}
          />
          <TextField
            label="Timezone"
            variant="outlined"
            fullWidth
            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
            error={!!errors.timezone}
          />
        </div>
      );
    case 'Payment Details':
      // JSX for inputting payment details
      return (
        <div>
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => openLink.open()}
          >
            Connect a Bank Account
          </Button>
        </div>
      );
    case 'Freelancer Verification':
      // For the freelancer verification step, delegate to another function to handle sub-steps
      return getFreelancerVerificationSubStepContent(freelancerVerificationSubSteps[activeSubStep]);
    default:
      return 'Unknown step';
  }
};
/**
 * Determines the content to display based on the current sub-step in the freelancer verification process.
 * @param {string} subStep - The current sub-step in the freelancer verification process.
 * @returns {JSX.Element} - The JSX content corresponding to the current sub-step.
 */
const getFreelancerVerificationSubStepContent = (subStep) => {
  switch (subStep) {
    case 'Industry Questions':
    // JSX for answering industry-related questions
      return <TextField label="Which industries have you worked in?" variant="outlined" fullWidth />;
    case 'Phone Number':
    // JSX for inputting phone number
      return <TextField label="Phone Number" variant="outlined" fullWidth />;
    case 'Email':
    // JSX for inputting email address
      return <TextField label="Email Address" variant="outlined" fullWidth />;
    case 'Skills':
    // JSX for rating skills
      return (
        <div>
          <Typography gutterBottom>Rate your creative industry skills</Typography>
          {formData.skills.map((skill, index) => (
            <div key={index}>
              <Typography gutterBottom>{skill.name}</Typography>
              <Slider
                value={skill.level}
                onChange={(e, newValue) => handleSkillChange(e, newValue, index)}
                min={0}
                max={10}
              />
            </div>
          ))}
        </div>
      );
    case 'Availability':
      // JSX for specifying availability
      return (
        <TextField
          label="Availability"
          variant="outlined"
          fullWidth
        />
      );
    case 'Education':
      // JSX for inputting educational background
      return (
        <div>
          <Typography gutterBottom>Add your educational background</Typography>
          {formData.education.map((edu, index) => (
            <div key={index}>
              <TextField
                name="degree"
                label="Degree"
                variant="outlined"
                value={edu.degree}
                onChange={(e) => handleEducationChange(e, index, 'degree')}
              />
              <TextField
                name="fieldOfStudy"
                label="Field of Study"
                variant="outlined"
                value={edu.fieldOfStudy}
                onChange={(e) => handleEducationChange(e, index, 'fieldOfStudy')}
              />
              <TextField
                name="yearOfCompletion"
                label="Year of Completion"
                variant="outlined"
                value={edu.yearOfCompletion}
                onChange={(e) => handleEducationChange(e, index, 'yearOfCompletion')}
                type="number"
                InputProps={{ inputProps: { min: 1950, max: new Date().getFullYear() } }}
              />
              <button onClick={() => removeEducation(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addEducation}>Add Education</button>
        </div>
      );
    case 'Creative Industry Experience':
      // JSX for describing creative industry experience
      return (
        <TextField
          label="Describe your experience in the creative industry"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
      );
   case 'Employment History':
      // JSX for inputting employment history
      return (
        <div>
          <Typography gutterBottom>Add your Employment History</Typography>
          {formData.employmentHistory.map((job, index) => (
            <div key={index}>
              <TextField
                name="jobTitle"
                label="Job Title"
                variant="outlined"
                value={job.jobTitle}
                onChange={(e) => handleEmploymentHistoryChange(e, index, 'jobTitle')}
              />
              <TextField
                name="company"
                label="Company"
                variant="outlined"
                value={job.company}
                onChange={(e) => handleEmploymentHistoryChange(e, index, 'company')}
              />
              <TextField
                name="duration"
                label="Duration"
                variant="outlined"
                value={job.duration}
                onChange={(e) => handleEmploymentHistoryChange(e, index, 'duration')}
              />
              <button onClick={() => removeEmployment(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addEmployment}>Add Employment</button>
        </div>
      );
    case 'Other Experiences':
      // JSX for describing other relevant experiences
      return (
        <TextField
          label="Describe your other relevant experiences"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
      );
    case 'Base Project Amount':
      // JSX for specifying base project amount
      return (
        <TextField
          label="Base Project Amount (in USD)"
          variant="outlined"
          fullWidth
          type="number"
        />
      );

    case 'Projects Per Week':
      // JSX for specifying number of projects per week
      return (
        <Typography gutterBottom>Projects Per Week</Typography>
      );

    case 'Portfolio':
      // JSX for inputting portfolio URL
      return (
        <TextField
          label="Portfolio URL"
          variant="outlined"
          fullWidth
        />
      );

    case 'Video Introduction':
      // JSX for uploading a video introduction
      return (
        <input type="file" accept="video/*" />
      );

    case 'Certifications':
      // JSX for inputting certifications
      return (
        <div>
          <Typography gutterBottom>Add your Certifications</Typography>
          {formData.certifications.map((certification, index) => (
            <div key={index}>
              <TextField
                name="name"
                label="Certification Name"
                variant="outlined"
                value={certification.name}
                onChange={(e) => handleCertificationChange(e, index, 'name')}
              />
              <TextField
                name="issuingAuthority"
                label="Issuing Authority"
                variant="outlined"
                value={certification.issuingAuthority}
                onChange={(e) => handleCertificationChange(e, index, 'issuingAuthority')}
              />
              <button onClick={() => removeCertification(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addCertification}>Add Certification</button>
        </div>
      );

    case 'Volunteering':
      // JSX for describing volunteering experiences
      return (
        <TextField
          label="Describe your volunteering experience"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
        />
      );

    case 'Social Media Links':
      // JSX for inputting social media links
      return (
        <TextField
          label="Social Media Links"
          variant="outlined"
          fullWidth
        />
      );

    case 'Review':
      // JSX for reviewing all inputted information
      return (
        <div>
          <Typography variant="h6" gutterBottom>Review Your Information</Typography>
          <pre>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      );
    default:
      return 'Unknown sub-step';
  }
};

  const handleNext = () => {
    if (activeStep === 2 && activeSubStep < freelancerVerificationSubSteps.length - 1) {
      setActiveSubStep((prevActiveSubStep) => prevActiveSubStep + 1);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setActiveSubStep(0);  // Reset sub-step for next main step
    }
  };
/**
 * `handleBack` function is responsible for navigating the user to the previous step or sub-step
 * in the signup process.
 * 
 * If the user is on the third step (index 2) and there's an active sub-step, 
 * the function will navigate to the previous sub-step. Otherwise, it will navigate to the previous main step.
 */
const handleBack = () => {
  if (activeStep === 2 && activeSubStep > 0) {
    setActiveSubStep((prevActiveSubStep) => prevActiveSubStep - 1);
  } else {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }
};

return (
  // Container to hold the entire signup form
  <Container maxWidth="md">
    {/* Title of the Signup Form */}
    <Typography variant="h4" gutterBottom>
      MPG Signup Form
    </Typography>
    {/* Stepper component to display the progress of the signup steps */}
    <Stepper activeStep={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
    {/* Dynamic content area that changes based on the active step or sub-step */}
    <div>
      {getStepContent(steps[activeStep], freelancerVerificationSubSteps[activeSubStep])}
    </div>
    {/* Navigation buttons for moving between steps */}
    <div>
      {/* "Back" button, disabled on the first step */}
      <Button disabled={activeStep === 0} onClick={handleBack}>
        Back
      </Button>
      {/* "Next" or "Submit" button, depending on the current step */}
      <Button variant="contained" color="primary" onClick={handleNext}>
        {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
      </Button>
    </div>
    {/* Display the DID (Decentralized Identifier) if available */}
    {did && <p>Your DID: {did}</p>}
    {/* Display the JWT (JSON Web Token) if available */}
    {jwt && <p>Your JWT: {jwt}</p>}
  </Container>
);

export default SignupForm;
