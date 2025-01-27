
# Bidding App

This is a simple bidding application built with **Django** for the backend and **React** for the frontend. Admins can add products, users can place bids, and the highest bid wins after the bidding period ends.

## Features

### Admin Features:
- Add new products with details like name, description, starting price, and bidding end time.

### User Features:
- View a catalogue of available products for bidding.
- View the current bid for each product (if applicable).
- Place bids on products, adhering to bidding rules (higher than the current bid).
- Bidding for a product closes once the bidding end time is reached.
- After bidding ends, the highest bid is highlighted.

## Requirements

### Backend (Django):
- Python 3.x
- Django
- Django REST Framework
- PostgreSQL or any relational database (e.g., SQLite)

### Frontend (React):
- React
- Bootstrap

## Installation

### Backend Setup (Django):
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For Linux/Mac
   venv\Scripts\activate     # For Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Create a superuser for admin access:
   ```bash
   python manage.py createsuperuser
   ```

6. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup (React):
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

## Endpoints


### Authentication (Optional):
- **POST /api/auth/token/** - Get JWT token.

## Database Schema (Example):

- **Product**:
  - `name` (string)
  - `description` (text)
  - `starting_price` (decimal)
  - `end_time` (datetime)

- **Bid**:
  - `user` (Foreign Key to User)
  - `product` (Foreign Key to Product)
  - `bid_amount` (decimal)
  - `timestamp` (datetime)

## Conclusion

This application allows users to bid on products with a simple UI and robust backend logic. The project has been designed to be extensible with additional features like authentication and state management.

Feel free to contribute or reach out with any questions!

---
