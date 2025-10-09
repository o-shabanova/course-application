# Task #4 - Mastering State In React Redux

Please refer to the task description in the course.

> ⚠️ **Before you start:**  
> Please create the `PrivateRoute` component under the `src/components` directory.

## 🔒 PrivateRoute – Protecting Authenticated Routes

Use this component to restrict access to specific routes for authenticated users only.  
If no token is found in `localStorage`, the user is automatically redirected to `/login`.

### Component

```tsx
import { FC } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
```

## Usage Example

```tsx
<Route
  path="/courses"
  element={
    <PrivateRoute>
      <Courses />
    </PrivateRoute>
  }
/>
```