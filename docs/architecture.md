# Lead Ops Showcase Hub Architecture

## Application Architecture

```mermaid
graph TD
    subgraph Frontend["Frontend Application"]
        App[App.tsx]
        subgraph Pages["Pages"]
            Home[Home Page]
            About[About Page]
            Experience[Experience Page]
            Projects[Projects Page]
            Contact[Contact Page]
        end
        
        subgraph Components["Core Components"]
            Navbar[Navbar]
            Hero[Hero]
            Footer[Footer]
            ThemeToggle[Theme Toggle]
        end
        
        subgraph FeatureComponents["Feature Components"]
            Skills[Skills]
            GitHubWidget[GitHub Widget]
            LighthouseWidget[Lighthouse Widget]
            ProjectsList[Projects List]
        end
        
        subgraph UI["UI Components"]
            Accordion[Accordion]
            Dialog[Dialog]
            Tabs[Tabs]
            Toast[Toast]
        end
    end
    
    subgraph BuildSystem["Build System"]
        Vite[Vite]
        TypeScript[TypeScript]
        Tailwind[Tailwind CSS]
    end
    
    subgraph Dependencies["Key Dependencies"]
        React[React]
        ReactRouter[React Router]
        ReactQuery[React Query]
        ShadcnUI[Shadcn UI]
        RadixUI[Radix UI]
    end
    
    %% Connections
    App --> Pages
    Pages --> Components
    Components --> UI
    Components --> FeatureComponents
    
    %% Build System Connections
    Frontend --> BuildSystem
    BuildSystem --> Dependencies
    
    %% Styling
    classDef frontend fill:#f9f,stroke:#333,stroke-width:2px
    classDef build fill:#bbf,stroke:#333,stroke-width:2px
    classDef deps fill:#bfb,stroke:#333,stroke-width:2px
    
    class Frontend frontend
    class BuildSystem build
    class Dependencies deps
```

## CI/CD Pipeline

```mermaid
graph LR
    subgraph CI["Continuous Integration"]
        Commit[Git Commit]
        PR[Pull Request]
        Main[Main Branch]
        
        subgraph Build["Build Process"]
            NpmInstall[NPM Install]
            Build[Vite Build]
            Test[Tests]
            Lint[ESLint]
        end
        
        subgraph Quality["Quality Checks"]
            Lighthouse[Lighthouse]
            SBOM[CycloneDX SBOM]
            Snyk[Snyk Security]
        end
    end
    
    subgraph CD["Continuous Deployment"]
        Netlify[Netlify]
        subgraph Environments["Environments"]
            Dev[Development]
            Prod[Production]
        end
    end
    
    %% Connections
    Commit --> PR
    PR --> Build
    Main --> Build
    
    Build --> Quality
    Quality --> Netlify
    Netlify --> Environments
    
    %% Styling
    classDef ci fill:#f96,stroke:#333,stroke-width:2px
    classDef cd fill:#69f,stroke:#333,stroke-width:2px
    classDef build fill:#9f6,stroke:#333,stroke-width:2px
    
    class CI ci
    class CD cd
    class Build build
```

## Development Workflow

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Git as Git
    participant CI as CI Pipeline
    participant Netlify as Netlify
    
    Dev->>Git: Create Feature Branch
    Dev->>Git: Commit Changes
    Dev->>Git: Create Pull Request
    
    Git->>CI: Trigger Build
    CI->>CI: Run Tests
    CI->>CI: Generate Changelog
    CI->>CI: Security Checks
    
    alt PR to Develop
        CI->>Netlify: Deploy to Dev
    else PR to Main
        CI->>Netlify: Deploy to Prod
    end
    
    Netlify-->>Dev: Deployment URL
```

## Key Features

1. **Frontend Architecture**
   - React-based SPA with TypeScript
   - Component-based architecture using Shadcn UI
   - Responsive design with Tailwind CSS
   - Dark/Light theme support

2. **Build System**
   - Vite for fast development and building
   - TypeScript for type safety
   - ESLint and Prettier for code quality
   - Husky for git hooks

3. **CI/CD Pipeline**
   - Automated testing and building
   - Security scanning with Snyk
   - SBOM generation with CycloneDX
   - Automated changelog generation
   - Netlify deployment for both dev and prod

4. **Quality Assurance**
   - Lighthouse performance monitoring
   - Automated security scanning
   - Code quality checks
   - Conventional commits with czg 