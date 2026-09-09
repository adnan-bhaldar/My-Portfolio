import { WindowControls } from '#components'
import { favorites, liveProjects } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper.jsx'
import useWindowStore from '#store/window.js'
import { ChevronLeft, ChevronRight, Copy, ExternalLink, PanelLeft, PlusIcon, Search, Share, ShieldHalf } from 'lucide-react'
import React, { useState } from 'react'

const isLikelyUrl = (value) => {
    if (/\s/.test(value)) return false

    const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`

    try {
        const url = new URL(candidate)
        return (
            ['http:', 'https:'].includes(url.protocol) &&
            (url.hostname === 'localhost' ||
                url.hostname.includes('.') ||
                url.hostname.includes(':'))
        )
    } catch {
        return false
    }
}

const TABS = [
    { id: 'home', label: 'Start Page' },
    { id: 'projects', label: 'Projects' },
]

const openExternal = (link) => window.open(link, '_blank', 'noopener,noreferrer')

const Safari = () => {
    const { openWindow } = useWindowStore()
    const [query, setQuery] = useState('')
    const [activeTab, setActiveTab] = useState('home')

    const handleSearch = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            const value = query.trim()
            const url = isLikelyUrl(value)
                ? (/^https?:\/\//i.test(value) ? value : `https://${value}`)
                : `https://www.google.com/search?q=${encodeURIComponent(value)}`

            openExternal(url)
            return
        }

        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
            e.preventDefault()
            e.target.select()
        }
    }

    return (
        <>
            <div id='window-header'>
                <WindowControls target="safari" />

                <PanelLeft className='ml-10 icon' />

                <div className='flex items-center gap-1 ml-5'>
                    <ChevronLeft className='icon' />
                    <ChevronRight className='icon' />
                </div>

                <div className="flex-1 flex-center gap-3">
                    <ShieldHalf className='icon' />

                    <div className="search">
                        <Search className='icon' />

                        <input
                            type="text"
                            placeholder='Search or enter website name'
                            className='flex-1'
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                            onClick={(e) => e.currentTarget.focus()}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className='icon' />
                    <PlusIcon className='icon' />
                    <Copy className='icon' />
                </div>
            </div>

            <div className="tab-strip">
                {TABS.map(({ id, label }) => (
                    <button
                        key={id}
                        type='button'
                        className={`tab ${activeTab === id ? 'active' : ''}`}
                        onClick={() => setActiveTab(id)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            <div className="safari-body">
                <div className="tab-content">
                    {activeTab === 'home' && (
                        <div className="start-page">
                            <div className="start-page-hero">
                                <h2>Favorites</h2>
                                <p>Quick access to my profiles, work, and resume</p>
                            </div>

                            <div className="favorites-grid">
                                {favorites.map(({ id, name, icon, bg, link, windowKey }) => (
                                    <button
                                        key={id}
                                        type='button'
                                        className="favorite-tile"
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={() => (windowKey ? openWindow(windowKey) : openExternal(link))}
                                    >
                                        <span className="favorite-icon" style={{ backgroundColor: bg }}>
                                            <img src={icon} alt={name} draggable={false} />
                                        </span>
                                        <p>{name}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="projects-grid">
                            {liveProjects.map(({ id, name, image, link }) => (
                                <div key={id} className="project-card">
                                    <img src={image} alt={name} draggable={false} />
                                    <div className="project-card-footer">
                                        <p>{name}</p>
                                        <button type='button' onClick={() => openExternal(link)}>
                                            Visit <ExternalLink size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

const SafariWindow = WindowWrapper(Safari, 'safari')

export default SafariWindow;