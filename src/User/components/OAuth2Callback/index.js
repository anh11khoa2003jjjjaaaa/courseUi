import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const OAuth2Callback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      localStorage.setItem('authToken', token);
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.RoleName;
      
      toast.success('Đăng nhập thành công!');
      
      setTimeout(() => {
        if (userRole === 'Teacher') {
          navigate('/teacherPost');
        } else if (userRole === 'Admin') {
          navigate('/admin/courses');
        } else if (userRole === 'Student') {
          navigate('/');
        }
      }, 1500);
    } else {
      toast.error('Đăng nhập không thành công');
      navigate('/login');
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4">Đang xử lý đăng nhập...</h2>
        {/* You can add a loading spinner here */}
      </div>
    </div>
  );
};

export default OAuth2Callback;