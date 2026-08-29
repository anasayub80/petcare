We now need to build the COMPLETE CUSTOMER / USER PANEL for the Pet Care platform.

IMPORTANT:
The current authentication flow is wrong.

CURRENT PROBLEM:
After Sign In, the application immediately asks the user to book an appointment and does not navigate them into their customer dashboard.

FIX THIS FIRST.

==================================================
CORRECT AUTH FLOW
==================================================

After successful login:

Redirect user to:

/dashboard

NOT directly to appointment booking.

The customer dashboard must become the main authenticated area.

Correct flow:

Sign In
→ Customer Dashboard
→ User chooses what they want to do

From Dashboard they can:

- Book Appointment
- Manage Pets
- View Appointments
- Talk to AI Assistant
- Manage Profile

If the user clicks "Book Appointment" from the public website while NOT logged in:

Book Appointment
→ Login/Register
→ after successful authentication
→ continue booking flow

But normal login should always navigate to:

/dashboard

Store the original intended URL only when authentication was triggered from a protected action.

Example:

User clicks:
Book Appointment

Redirect:
/login?redirect=/dashboard/book

After successful login:
navigate to /dashboard/book

Normal login:
navigate to /dashboard

==================================================
CUSTOMER PANEL DESIGN
==================================================

Build a complete premium customer dashboard.

The UI must follow the same phenomenal, premium visual language established on the public website.

Do NOT create a generic admin dashboard.

This is a PET OWNER EXPERIENCE.

It should feel:

- Warm
- Friendly
- Premium
- Modern
- Personal
- Easy to understand
- Visually polished
- Mobile friendly

Use the existing:

- Typography
- Brand colors
- Buttons
- Border radius
- Shadows
- Icons
- Animation system
- Design tokens

Avoid making the customer portal look completely different from the landing website.

==================================================
ROUTES
==================================================

Create protected routes:

/dashboard
/dashboard/pets
/dashboard/pets/new
/dashboard/pets/:id
/dashboard/book
/dashboard/appointments
/dashboard/appointments/:id
/dashboard/assistant
/dashboard/profile
/dashboard/settings

All routes under /dashboard must require authentication.

If unauthenticated:

Redirect to /login

==================================================
DASHBOARD LAYOUT
==================================================

Create an authenticated layout containing:

Desktop:
- Sidebar
- Top navigation
- Main content area

Tablet:
- Collapsible sidebar

Mobile:
- Compact header
- Slide-out navigation or bottom navigation

Navigation:

Overview
My Pets
Book Appointment
Appointments
Pet Assistant
Profile

Bottom section:

Settings
Logout

Show the user's profile avatar and name.

Do not make the sidebar excessively wide.

==================================================
1. DASHBOARD OVERVIEW
==================================================

Route:

/dashboard

Create a personalized welcome area.

Example:

Good Morning, Sarah 👋
How are Max and Luna doing today?

Include pet avatars where appropriate.

Main dashboard sections:

UPCOMING APPOINTMENT

Show nearest appointment:

Pet
Service
Date
Time
Status
Veterinarian/Groomer if assigned

Actions:

View Appointment
Reschedule
Cancel

If there is no appointment:

"No upcoming appointments"

CTA:
Book Appointment

--------------------------------------------------

MY PETS PREVIEW

Display user's pets.

Example:

Max
Golden Retriever
3 Years Old

Luna
British Shorthair
2 Years Old

Include:

Add New Pet
View All Pets

Use beautiful pet-profile cards with actual pet photos.

--------------------------------------------------

QUICK ACTIONS

Create visually polished actions:

Book Appointment
Ask Pet Assistant
Add Pet
View Appointments

Do not use boring generic square cards.

--------------------------------------------------

PET CARE REMINDERS

Prepare UI for:

Upcoming vaccination
Routine grooming
Annual health check
Follow-up consultation

Example:

"Max's vaccination may be due next month."

These can initially use mock data until backend integration is complete.

--------------------------------------------------

RECENT ACTIVITY

Examples:

Grooming appointment completed
Pet profile updated
Appointment confirmed
Vaccination completed

==================================================
2. MY PETS
==================================================

Route:

/dashboard/pets

Allow users to manage multiple pets.

Display:

Pet Image
Name
Species
Breed
Age
Gender
Weight

Actions:

View Profile
Edit
Delete

CTA:

+ Add New Pet

If there are no pets:

Create a beautiful empty state.

Example:

"Let's add your best friend."

CTA:
Add Your First Pet

==================================================
ADD PET
==================================================

Route:

/dashboard/pets/new

Create a beautiful multi-section form.

Fields:

Pet Photo

Pet Name

Species:
Dog
Cat
Other

Breed

Gender

Date of Birth

Age should preferably calculate automatically from DOB.

Weight

Weight unit

Color

Optional fields:

Allergies

Medical conditions

Medications

Behavior notes

Additional notes

Buttons:

Save Pet
Cancel

Validate fields properly.

==================================================
PET PROFILE
==================================================

Route:

/dashboard/pets/:id

Create a premium detailed pet profile.

Top section:

Large pet photo

Name
Breed
Age
Weight
Gender

Actions:

Edit Profile

Then sections:

Health Overview

Allergies
Medical conditions
Medications

Care Notes

Upcoming Appointments

Appointment History

Vaccination History

Recent Services

Pet Care Recommendations

Include:

Book Appointment For This Pet

==================================================
3. BOOK APPOINTMENT
==================================================

Route:

/dashboard/book

Build a beautiful MULTI-STEP booking experience.

Do NOT place everything in one long form.

STEP 1
Choose Pet

Show user's pet cards.

Also allow:

+ Add New Pet

STEP 2
Choose Service

Services:

Pet Grooming
Veterinary Consultation
Vaccination
Wellness Check

Show:

Icon
Description
Duration
Price if available

STEP 3
Choose Date

Create a modern calendar UI.

Disable unavailable dates.

STEP 4
Choose Time

Display available slots:

9:00 AM
9:30 AM
10:00 AM
etc.

Unavailable slots must not be selectable.

STEP 5
Additional Information

Reason for appointment

Symptoms / Notes

Special instructions

STEP 6
Review

Show:

Pet
Service
Date
Time
Price
Notes

CTA:

Confirm Appointment

After successful booking:

DO NOT redirect away immediately.

Show premium success state:

"Appointment Confirmed!"

Then buttons:

View Appointment
Back to Dashboard

==================================================
BOOKING BACKEND RULES
==================================================

The server must validate the appointment again before creation.

Do not trust frontend availability.

Prevent two customers from booking the same:

Date
Time slot
Service/provider when applicable

Use database-level protection where possible.

If slot becomes unavailable before confirmation:

Return proper error.

Frontend message:

"This time slot was just booked. Please choose another time."

==================================================
4. APPOINTMENTS
==================================================

Route:

/dashboard/appointments

Tabs:

Upcoming
Completed
Cancelled
All

Each appointment should show:

Pet
Service
Date
Time
Status
Booking ID

Statuses:

Pending
Confirmed
In Progress
Completed
Cancelled
No Show

Actions depending on status:

View
Reschedule
Cancel
Book Again

==================================================
APPOINTMENT DETAILS
==================================================

Route:

/dashboard/appointments/:id

Display:

Appointment Status

Pet

Service

Date

Time

Duration

Assigned professional if available

Customer notes

Service notes

Price

Booking number

Created date

Actions:

Reschedule
Cancel

For completed appointments:

Book Again

==================================================
RESCHEDULE
==================================================

Allow users to modify:

Date
Time

Reuse the booking calendar and availability system.

Server must validate availability before updating.

==================================================
CANCEL APPOINTMENT
==================================================

Use a confirmation modal.

Ask:

"Are you sure you want to cancel this appointment?"

Optional:

Cancellation reason.

Never immediately delete appointments.

Update status to:

Cancelled

Keep appointment history.

==================================================
5. AI PET ASSISTANT
==================================================

Route:

/dashboard/assistant

Build a premium ChatGPT-style pet assistant experience but matching our brand.

Heading:

"Pet Care Assistant"

User can choose:

Which pet they are asking about.

Example:

Talking about:
Max — Golden Retriever

AI should receive relevant pet information:

Species
Breed
Age
Weight
Allergies
Known conditions
Notes

AI can help with:

- Service recommendations
- Grooming guidance
- Vaccination information
- General pet care
- Choosing suitable appointments
- Understanding available platform services

Example:

User:
"Max is scratching frequently."

AI:

Give safe general guidance and potentially suggest a veterinary consultation.

Provide suggested action CTA:

Book Veterinary Consultation

IMPORTANT SAFETY:

AI must NEVER claim to diagnose medical conditions.

For symptoms requiring professional attention:

Recommend seeing a veterinarian.

For emergencies:

Clearly recommend immediate veterinary care.

==================================================
AI CHAT UI
==================================================

Include:

Pet selector

Conversation history

New conversation

Message input

Suggested questions

Example suggestions:

"When should Max be groomed?"

"Does Luna need a vaccination?"

"Which service should I book?"

Allow AI responses to include actionable buttons such as:

Book Grooming
Book Consultation
View Pet Profile

==================================================
6. PROFILE
==================================================

Route:

/dashboard/profile

User can edit:

Profile Picture
Full Name
Email
Phone Number

Optional:

Address
City

Emergency contact

Provide:

Save Changes

==================================================
7. SETTINGS
==================================================

Route:

/dashboard/settings

Sections:

Account

Password

Notifications

Privacy

Notification preferences:

Appointment confirmation
Appointment reminder
Appointment changes
Pet care reminders

Actions:

Change Password

Logout

Delete Account

Delete Account must require clear confirmation.

==================================================
NOTIFICATIONS
==================================================

Add a notification icon in dashboard header.

Notification examples:

Appointment confirmed

Appointment tomorrow at 10 AM

Vaccination reminder

Appointment rescheduled

Show:

Unread indicator

Notification dropdown

View All

==================================================
DATA MODELS
==================================================

Create/update MongoDB models.

USER

{
  name,
  email,
  password,
  phone,
  avatar,
  role,
  createdAt,
  updatedAt
}

PET

{
  ownerId,
  name,
  species,
  breed,
  gender,
  dateOfBirth,
  weight,
  photo,
  color,
  allergies[],
  conditions[],
  medications[],
  behaviorNotes,
  notes,
  createdAt,
  updatedAt
}

SERVICE

{
  name,
  slug,
  description,
  duration,
  price,
  category,
  image,
  active
}

APPOINTMENT

{
  userId,
  petId,
  serviceId,
  date,
  startTime,
  endTime,
  status,
  customerNotes,
  internalNotes,
  assignedStaffId,
  price,
  cancellationReason,
  createdAt,
  updatedAt
}

==================================================
API STRUCTURE
==================================================

Implement clean APIs such as:

AUTH

POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
POST /api/auth/logout

PETS

GET /api/pets
GET /api/pets/:id
POST /api/pets
PUT /api/pets/:id
DELETE /api/pets/:id

SERVICES

GET /api/services
GET /api/services/:id

APPOINTMENTS

GET /api/appointments
GET /api/appointments/:id
POST /api/appointments
PUT /api/appointments/:id
PATCH /api/appointments/:id/status

GET /api/availability

AI

POST /api/assistant/chat

USER

GET /api/users/me
PUT /api/users/me
PUT /api/users/me/password

==================================================
SECURITY
==================================================

Critical:

A user must ONLY be able to access:

Their own profile
Their own pets
Their own appointments
Their own AI conversation context

Never trust userId sent from frontend.

Retrieve authenticated user ID from authentication token/session.

Example:

req.user.id

Every Pet query must verify:

ownerId === req.user.id

Every appointment query must verify:

userId === req.user.id

==================================================
STATE MANAGEMENT
==================================================

Use TanStack Query for:

Pets
Appointments
Services
Profile
Availability

Create clean hooks:

useUser()
usePets()
usePet()
useAppointments()
useAppointment()
useServices()
useAvailability()

Invalidate relevant queries after mutations.

Example:

After creating appointment:

invalidate:
appointments
dashboard data

==================================================
LOADING EXPERIENCE
==================================================

Do not show random spinners everywhere.

Create polished skeleton loaders for:

Dashboard
Pet cards
Appointments
Pet profile
Booking slots

==================================================
EMPTY STATES
==================================================

Create beautiful empty states.

Examples:

NO PETS

"You haven't added any pets yet."

Add Your First Pet

NO APPOINTMENTS

"No appointments scheduled."

Book Appointment

NO AI CONVERSATIONS

"Ask your first pet care question."

==================================================
ERROR HANDLING
==================================================

Handle:

Network failures
Authentication expiration
Unavailable appointments
Invalid forms
API errors
AI errors

Show friendly toast notifications.

Never expose raw backend errors.

==================================================
MOBILE EXPERIENCE
==================================================

The dashboard must be excellent on mobile.

Important:

Do NOT just shrink the desktop sidebar.

Create proper mobile navigation.

Booking calendar
Pet selection
Service selection
Appointment cards
AI chat

must all work comfortably on mobile screens.

==================================================
UX DETAILS
==================================================

Add tasteful animations using Framer Motion.

Examples:

Page transitions
Cards appearing
Booking step transitions
Success confirmation
Pet card hover
Button states
Modal transitions

Keep animations fast and subtle.

==================================================
AUTHENTICATION FIX — IMPORTANT
==================================================

Review the existing login implementation.

Fix navigation logic so:

NORMAL LOGIN

/login
→ successful authentication
→ /dashboard

PROTECTED BOOKING

User clicks Book Appointment while logged out

→ /login?redirect=/dashboard/book
→ authentication
→ /dashboard/book

PROTECTED PET PROFILE ETC.

Store intended authenticated route and restore it after login.

Never permanently force every logged-in user into booking.

If authenticated user visits:

/login
/register

Redirect them automatically to:

/dashboard

==================================================
FINAL EXPECTATION
==================================================

The customer area should feel like a polished consumer pet-care application, not an admin dashboard.

The user's most important information should always be easy to access:

Their pets
Their next appointment
Booking
Pet Assistant

Build the complete customer panel now while keeping the existing public website design system intact.

Do NOT build the Admin Dashboard in this phase.

After completing this phase, stop and wait for the next instructions.