import React, { useState, useEffect } from 'react';
import ArtistCard from './ArtistCard';
import ArtistForm from './ArtistForm';
import APIManager from '../../modules/APIManager';
import Popup from "reactjs-popup";

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
            <section className="section-content">
                <div className="icon-header">
                    <div></div>
                    <div className="artist-header">
                        <h1 className="artists">ARTISTS</h1>
                    </div>
                    <div className="icon-container">
                        <span data-tooltip="BACK" data-placement="bottom"><i className="big arrow circle left icon" id="back-arrow-detail" onClick={() => props.history.push('/')}></i></span>
                        <Popup trigger={<span data-tooltip="ADD" data-placement="top"><i className="big plus square outline icon" id="plusIcon" onClick={() => props.history.push('/artists/new')}></i></span>} position="right center">
                            <ArtistForm></ArtistForm>
                        </Popup>
                    </div>
                </div>
                <div className="container-cards">
                    {artists.map(artistItem =>
                        <ArtistCard
                            key={artistItem.id}
                            artist={artistItem}
                            {...props}
                        />)}
                </div>
            </section>

        </div >
    );
};
export default ArtistsList