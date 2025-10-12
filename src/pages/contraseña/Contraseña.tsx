import React, { useState } from 'react';
import './Contraseña.scss';
import FormGroup from '../../components/form-group/FormGroup';

const Contraseña: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); 
    const [error, setError] = useState('');     

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        setError('');
        setMessage('');

        const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log("datos que vienen del back", data)
            if (!response.ok) {
                throw new Error(data.message || 'No se pudo procesar la solicitud.');
            }

           
            setMessage(data.message);

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <section className="contraseña">
            <div className="contraseña__container">
                <h1 className="contraseña__title">Recupera tu contraseña</h1>
                <p className="contraseña__subtitle">Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.</p>
                
                <form className="contraseña__form" onSubmit={handleSubmit}>
                    <FormGroup 
                        label="Correo Electrónico" 
                        type="email" 
                        id="email" 
                        placeholder="tu@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Muestra mensajes de éxito o error */}
                    {message && <p className="form-message success">{message}</p>}
                    {error && <p className="form-message error">{error}</p>}

                    <button type="submit" style={{ width: '60%', margin: '1rem auto' }} className="btn btn--primary">
                        Enviar Enlace de Recuperación
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contraseña;