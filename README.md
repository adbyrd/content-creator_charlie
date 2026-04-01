# Content Creator v.2

## Application  

```json
{
  "profile": {
    "companyName": "Cuddle Clones",
    "companyEmail": "support@cuddleclones.com",
    "zipCode": "59353",
    "websiteUrl": "https://cuddleclones.com",
    "primaryCategory": "Professional Service",
    "primarySubCategory": "Custom Manufacturer",
    "companyDescription": "Custom plush toys handcrafted to look exactly like a customer's real pet.",
    "customerType": "B2C",
    "preferredPlatform": "Instagram",
    "lastUpdated": "2026-04-01T10:42:00Z"
  }
}

```

https://www.adbyrd.com/cc
https://www.adbyrd.com/cc/member-check
https://www.adbyrd.com/profile-settings



## Application Directory   
```bash   
└── /backend   
        └── /config   
        └── /integrations   
        └── /services  
            └── category.web.js    
            └── profile.web.js    
            └── project.web.js    

└── /databases    
        └── profiles.csv    
        └── projects.csv    

└── /page_code    
        └── /global  
            └── masterPage.js 
        └── /marketing  
            └── home.page.js  
            └── auth-gate.page.js  
        └── /dashboard
            └── profilesetting.page.js  
            └── project-explorer.page.js  
        └── /modals 
            └── settings-business.modal.js
            └── settings-business.modal.js
            └── settings-business.modal.js
            └── projects-business.modal.js
└── /public  
        └── /styles  
        └── /utils  

```  








## Application Details  

## Backend  
The secure core of the application where sensitive business logic, identity hub processing, and data-handling operations reside away from the browser.    
Learn more about the [/backend](./cc/app/backend/README.md) ▶  
    
### Config   
Centralized storage for environment variables, global constants, and system-wide settings that govern how the content engine behaves.  
Learn more about the [/backend/config](./cc/app/backend/README.md) ▶  
    
### Integrations   
Dedicated space for managing external API connections, such as AI model endpoints or social media platforms for autonomous publishing.  
Learn more about the [/backend/integrations](./cc/app/backend/README.md) ▶  
    
### Services    
The functional heart of the app, housing the logic for profile management, category sorting, and the automated content production engine.    
Learn more about the [/backend/services](./cc/app/backend/README.md) ▶  







## Databases  
The persistent storage layer containing schemas for user profiles and project data, ensuring brand context is never lost or repeatedly requested.  
Learn more about the [/databases](./cc/app/databases/README.md) ▶  







## Page Code    
The primary directory for client-side logic, managing how users interact with the identity hub and view their autonomous content output.  
Learn more about the [/page_code](./cc/app/page_code/README.md) ▶   
     
### Dashboard
The main user interface where business owners manage their settings, explore generated projects, and monitor the autonomous engine.  
Learn more about the [/page_code/dashboard](./cc/app/backend/README.md) ▶  
    
### Global   
Site-wide scripts, like the master page, that handle consistent UI elements and cross-page state for the business identity profile.  
Learn more about the [/page_code/global](./cc/app/backend/README.md) ▶  
    
### Marketing  
Logic for the public-facing side of the SaaS, including landing pages and authentication gates for new or returning creators.  
Learn more about the [/page_code/marketing](./cc/app/backend/README.md) ▶  
    
### Modals  
Focused code for pop-up interfaces used to update business definitions, product details, or specific customer audience settings.  
Learn more about the [/page_code/modals](./cc/app/backend/README.md) ▶  







   
## Public  
Files and scripts accessible by both the browser and the backend, facilitating seamless interaction across the entire Wix ecosystem.  
Learn more about the [/public](./cc/app/public/README.md) ▶  

### Styles 
Centralized CSS and design tokens used to ensure the platform’s UI remains as professional and consistent as the content it generates.
Learn more about the [/public/styles](./cc/app/public/README.md) ▶  
  
### Utils 
Reusable helper functions and formatting tools that streamline common tasks like date manipulation or text parsing across the site.  
Learn more about the [/public/utils](./cc/app/public/README.md) ▶  