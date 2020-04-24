import React from 'react';
import { Heading, Image, Tile } from 'react-bulma-components';
import { Link } from 'react-router-dom';

const About = () => (
  <Tile className="is-ancestor">
    <Tile></Tile>
    <Tile className="is-parent is-6">
      <Tile className="is-vertical">
        <Tile></Tile>
        <Link to="/home" style={{ color: 'inherit' }}>
          <Tile className="is-child has-text-centered">
            <Heading size={2}>Images hybrides</Heading>
            <p>Ici vous pouvez voir et uploader vos magnifiques images.</p>
          </Tile>
        </Link>
        <Tile></Tile>
      </Tile>
      <Tile className="is-child is-4">
        <Link to="/home" style={{ color: 'inherit' }}>
          <Image src="/Images/mamouth-abeille.png" />
        </Link>
      </Tile>
    </Tile>
    <Tile></Tile>
  </Tile>
);

export default About;
