import React from 'react'

const TeamCard: React.FC = (props: any) => {
    return (
        <div className="team__card">
            <div className="team__avatar">
                <span className="avatar__initials">{props.initials}</span>
            </div>
            <h3 className="team__name">{props.name}</h3>
            <p className="team__role">{props.role}</p>
            <p className="team__role--spanish">{props.roleSpanish}</p>
        </div>
    )
}

export default TeamCard