import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';
import APIManager from '../../modules/APIManager';

const ArtistsList = (props) => {
    const [artists, setArtists] = useState([]);

    const getArtists = () => {
        APIManager.getAll("artists").then(artistsFromAPI => {
            // this .sort() method puts artists in alphabetical order on dashboard.
            setArtists(artistsFromAPI);
        });
    };

    useEffect(() => {
        getArtists();
    }, []);

    return (
        <div>
            <section className="section-content">
                <div className="icon-container">
                    <span data-tooltip="BACK"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/')}></i></span>
                    <span data-tooltip="ADD"><i className="big plus square outline icon" id="plusIcon" onClick={() => props.history.push('/artists/new')}></i></span>
                </div>
                <h1 className="artists">ARTISTS</h1>
                <div className="container-cards">
                    {artists.map(artistItem =>
                        <ArtistCard
                            key={artistItem.id}
                            artist={artistItem}
                            {...props}
                        />)}
                </div>
            </section>

        </div>
    );
};
export default ArtistsList