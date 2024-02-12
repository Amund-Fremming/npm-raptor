# npm-raptor

- Simple tool for generating folders and files for dotnet projects.
- The library will also update you Program.cs file with:
  - Service registration
  - Repository registration
  - Swagger setup
- Will take in a array of Model names, and genereate folders and files for:
  - Controllers
  - Services
  - Repositories
  - Interfaces
- Also installs packages like:
  - Postgresql driver
  - EF Core
  - SwashBuckle
