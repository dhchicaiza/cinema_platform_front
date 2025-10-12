import React from 'react'
import './TeamCard.scss'

interface TeamCardProps {
    initials: string
    name: string
    role: string
    roleSpanish: string
}

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