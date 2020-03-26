import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';
import APIManager from '../../modules/APIManager';

const ArtistsList = (props) => {
    const [artists, setArtists] = useState([]);

    const getArtists = () => {
        APIManager.getAll("artists").then(artistsFromAPI => {
            setArtists(artistsFromAPI);
        });
    };

    useEffect(() => {
        getArtists();
    }, []);

    return (
        <div>
            <section className="artists-content">
                <div className="artists-list-icon-header">
                    <div className="artists-header">
                        <h1 className="artists">ARTISTS</h1>
                    </div>
                    <div className="icon-container">
                        <span data-tooltip="TO DASHBOARD" data-placement="bottom"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/')}></i></span>
                        <span data-tooltip="ADD" data-placement="top"><i className="big plus square outline icon" id="plusIcon" onClick={() => props.history.push('/artists/new')}></i></span>
                    </div>
                </div>
                <div className="container-cards">
                    {artists.sort(function (a, b) {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();
                        if (nameA < nameB) {
                            return -1;
                        }
                        if (nameA > nameB) {
                            return 1;
                        }
                        return 0;
                    }).map(artistItem =>
                        <ArtistCard
                            key={artistItem.id}
                            artist={artistItem}
                            getArtists={getArtists}
                            {...props}
                        />)}
                </div>
            </section>

        </div >
    );
};
export default ArtistsList