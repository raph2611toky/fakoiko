import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/pages/login.css';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = language === 'fr' ? 'Email invalide' : 'Email tsy mety';
    if (!formData.password) newErrors.password = language === 'fr' ? 'Mot de passe requis' : 'Tonia ilaina';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      login({
        email: formData.email,
        name: formData.email.split('@')[0],
        role: 'citizen',
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginWithGoogle({
        sub: Date.now(),
        email: 'user@gmail.com',
        name: 'Google User',
        picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=google${Date.now()}`,
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h1>{language === 'fr' ? 'Se connecter' : 'Magconnect'}</h1>
            <p>{language === 'fr' ? 'Accédez à votre compte EcoLink' : 'Ahafonina ny ianao kaonty EcoLink'}</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <Input
              type="email"
              name="email"
              placeholder={language === 'fr' ? 'Votre email' : 'Ianao email'}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />

            <Input
              type="password"
              name="password"
              placeholder={language === 'fr' ? 'Mot de passe' : 'Tonia'}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Button
              type="submit"
              loading={loading}
              className="login-btn"
            >
              {language === 'fr' ? 'Se connecter' : 'Magconnect'}
            </Button>
          </form>

          <div className="divider">
            <span>{language === 'fr' ? 'Ou' : 'Na'}</span>
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={handleGoogleLogin}
            className="google-btn"
            disabled={loading}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
              <path fill="currentColor" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-.868 19.838c-3.884 0-7.038-2.637-8.055-6.236h1.667c.992 3.133 3.862 5.404 7.195 5.404 1.946 0 3.758-.738 5.115-1.933l1.372 1.372c-1.633 1.501-3.864 2.393-6.294 2.393zm6.908-3.5c1.194-1.449 1.95-3.33 1.95-5.338 0-4.644-3.764-8.408-8.408-8.408s-8.408 3.764-8.408 8.408 3.764 8.408 8.408 8.408c1.96 0 3.788-.68 5.215-1.816l-1.301-1.301c-1.085.743-2.42 1.18-3.914 1.18-3.764 0-6.824-3.06-6.824-6.824s3.06-6.824 6.824-6.824c3.083 0 5.736 2.086 6.55 4.908h-6.55v1.584h8.134c.063.333.106.674.106 1.016 0 .333-.043.665-.106.998z"/>
            </svg>
            {language === 'fr' ? 'Se connecter avec Google' : 'Magconnect amin\'i Google'}
          </Button>

          <p className="signup-link">
            {language === 'fr' ? 'Pas encore inscrit?' : 'Wala pa bang kaonty?'}{' '}
            <Link to="/signup">{language === 'fr' ? 'Créer un compte' : 'Mamorona kaonty'}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
