# Product Overview

**DIUT** is a Healthcare Data Center (HCDC) laboratory information management system designed for medical laboratories.

## Core Components

- **HCDC Access Service**: Main backend API server handling laboratory data management, user authentication, and business logic
- **HCDC Web App**: React-based frontend application for laboratory staff and administrators
- **Browser Service**: Specialized service for PDF generation and browser automation tasks

## Domain Areas

The system manages key laboratory operations including:
- Patient management and patient types
- Sample collection, processing, and tracking
- Test management (categories, elements, combos)
- Medical instruments and bio-products
- Diagnostic reports and print forms
- User roles and authentication
- Branch/location management

## Infrastructure

Deployed on Kubernetes with comprehensive observability (Prometheus, Loki, Tempo) and supporting services (MongoDB, Redis, MinIO for object storage).