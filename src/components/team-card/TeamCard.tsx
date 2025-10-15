import React from 'react'
import './TeamCard.scss'

/**
 * Props interface for the TeamCard component
 * @interface TeamCardProps
 * @property {string} initials - The initials of the team member displayed in the avatar
 * @property {string} name - The full name of the team member
 * @property {string} role - The role/position of the team member in English
 * @property {string} roleSpanish - The role/position of the team member in Spanish
 */
interface TeamCardProps {
    initials: string
    name: string
    role: string
    roleSpanish: string
}

/**
 * TeamCard Component
 * 
 * A card component that displays information about a team member.
 * Shows an avatar with initials, the member's name, and their role in both English and Spanish.
 * Features responsive design that adapts layout based on screen size.
 * 
 * @component
 * @param {TeamCardProps} props - The component props
 * @returns {React.ReactElement} A styled card displaying team member information
 * 
 * @example
 * <TeamCard 
 *   initials="JD" 
 *   name="John Doe" 
 *   role="Frontend Developer" 
 *   roleSpanish="Desarrollador Frontend"
 * />
 * 
 * @example
 * // With data from an array
 * {teamMembers.map(member => (
 *   <TeamCard 
 *     key={member.id}
 *     initials={member.initials}
 *     name={member.name}
 *     role={member.role}
 *     roleSpanish={member.roleSpanish}
 *   />
 * ))}
 */
const TeamCard: React.FC<TeamCardProps> = ({ initials, name, role, roleSpanish }) => {
    return (
        <div className="team__card">
            <div className="team__avatar">
                <span className="avatar__initials">{initials}</span>
            </div>
            <h3 className="team__name">{name}</h3>
            <p className="team__role">{role}</p>
            <p className="team__role--spanish">{roleSpanish}</p>
        </div>
    )
}

export default TeamCard