import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/pages/signup.css';

export default function SignUp() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();
  const { language, t } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'citizen',
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
    if (!formData.name.trim()) newErrors.name = language === 'fr' ? 'Le nom est requis' : 'Anarana dia ilaina';
    if (!formData.email.includes('@')) newErrors.email = language === 'fr' ? 'Email invalide' : 'Email tsy mety';
    if (formData.password.length < 6) newErrors.password = language === 'fr' ? 'Le mot de passe doit contenir au moins 6 caractères' : 'Tonia misy 6 na mihoatra';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = language === 'fr' ? 'Les mots de passe ne correspondent pas' : 'Tonia tsy mitovy';
    
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
        name: formData.name,
        role: formData.role,
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1000);
  };

  const handleGoogleLogin = () => {
    // Simulation de connexion Google
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
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <h1>{language === 'fr' ? 'Créer un compte' : 'Mamorona kaonty'}</h1>
            <p>{language === 'fr' ? 'Rejoignez EcoLink dès maintenant' : 'Somba amin\'i EcoLink ankehitriny'}</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <Input
              type="text"
              name="name"
              placeholder={language === 'fr' ? 'Votre nom complet' : 'Anarana tanteraka'}
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />

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

            <Input
              type="password"
              name="confirmPassword"
              placeholder={language === 'fr' ? 'Confirmer le mot de passe' : 'Hakafantarina ny tonia'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />

            <div className="role-selector">
              <label>{language === 'fr' ? 'Je m\'inscris en tant que:' : 'Misoratra ho:'}</label>
              <select name="role" value={formData.role} onChange={handleChange} className="role-select">
                <option value="citizen">{language === 'fr' ? 'Citoyen' : 'Mponina'}</option>
                <option value="collector">{language === 'fr' ? 'Collecteur de déchets' : 'Mpangongan\'ny ônja'}</option>
                <option value="validator">{language === 'fr' ? 'Validateur' : 'Mpanamarika'}</option>
                <option value="municipality">{language === 'fr' ? 'Municipalité' : 'Kaominina'}</option>
              </select>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="signup-btn"
            >
              {language === 'fr' ? 'Créer mon compte' : 'Mamorona kaonty'}
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
            {language === 'fr' ? 'S\'inscrire avec Google' : 'Misoratra amin\'i Google'}
          </Button>

          <p className="login-link">
            {language === 'fr' ? 'Vous avez déjà un compte?' : 'Mayroon na kayong kaonty?'}{' '}
            <Link to="/login">{language === 'fr' ? 'Connectez-vous' : 'Magconnect'}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
