import { WindowControls } from '#components'
import { favorites, liveProjects } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper.jsx'
import useWindowStore from '#store/window.js'
import { ChevronLeft, ChevronRight, Copy, ExternalLink, Home, LayoutGrid, PanelLeft, PlusIcon, Search, Share, ShieldHalf, X } from 'lucide-react'
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
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'projects', label: 'Projects', icon: LayoutGrid },
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

                        {query && (
                            <button
                                type='button'
                                className="clear-search"
                                aria-label="Clear address bar"
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                    setQuery('')
                                    e.currentTarget.previousElementSibling?.focus()
                                }}
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className='icon' />
                    <PlusIcon className='icon' />
                    <Copy className='icon' />
                </div>
            </div>

            <div className="safari-body">
                <div className="tab-content">
                    {activeTab === 'home' && (
                        <div className="start-page">
                            <div className="start-page-hero">
                                <h2>Favorites</h2>
                                <p>Quick access to my profiles, work, and resume</p>
                            </div>

                            <div className="favorites-panel">
                                <div className="favorites-grid">
                                    {favorites.map(({ id, name, icon, bg, link, windowKey }, index) => (
                                        <button
                                            key={id}
                                            type='button'
                                            className="favorite-tile"
                                            style={{ animationDelay: `${index * 60}ms` }}
                                            onMouseDown={(e) => e.stopPropagation()}
                                            onClick={() => (windowKey ? openWindow(windowKey) : openExternal(link))}
                                        >
                                            <span className="favorite-icon" style={{ '--tile-color': bg }}>
                                                <img src={icon} alt={name} draggable={false} />
                                            </span>
                                            <p>{name}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div className="projects-grid">
                            {liveProjects.map(({ id, name, image, link }, index) => (
                                <div
                                    key={id}
                                    className="project-card"
                                    style={{ animationDelay: `${index * 70}ms` }}
                                >
                                    <div className="project-thumb">
                                        <img src={image} alt={name} draggable={false} />
                                    </div>

                                    <div className="project-card-overlay">
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

                <div className="floating-tabs">
                    {TABS.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            type='button'
                            className={`segment ${activeTab === id ? 'active' : ''}`}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={() => setActiveTab(id)}
                        >
                            <Icon size={14} />
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

const SafariWindow = WindowWrapper(Safari, 'safari')

export default SafariWindow;