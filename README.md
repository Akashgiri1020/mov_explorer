# **Movie Explorer**

A modern, responsive **Movie Explorer SPA** built using **Next.js**, **TypeScript**, and **Tailwind CSS**. This application allows users to search for movies, view search results in a grid layout, and explore detailed information about individual movies via **The Movie Database (TMDB) API**.

---

## **Features**

### 🎥 **Movie Search & Listing**

- Search for movies by title using a search bar.
- View search results in a dynamic and responsive grid layout.
- Infinite scrolling to load more results seamlessly.

### 📋 **Movie Detail View**

- View detailed information about a selected movie, including:
  - Synopsis
  - Rating
  - Cast
- Navigate back to search results with ease.

### 🔧 **Additional Features**

- **Favorites List**: Save movies to a persistent favorites list.
- **Error Handling**: User-friendly error messages for network and API issues.
- **Responsive Design**: Optimized for all screen sizes – mobile, tablet, and desktop.

---

## **Getting Started**

### **Prerequisites**

Ensure the following tools are installed on your system:

- **Node.js**: Version 16 or higher.
- **npm** or **yarn**: For dependency management.
- A **TMDB API Key**: Get yours for free at [The Movie Database](https://www.themoviedb.org/documentation/api).

---

### **Installation**

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/movie-explorer.git
   cd movie-explorer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your TMDB API key:

   ```env
   NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
   NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### **Building for Production**

To create an optimized production build, run:

```bash
npm run build
# or
yarn build
```

This will generate a `/.next` folder containing the compiled files.

To start the production server, run:

```bash
npm start

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### **Learn More**

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
