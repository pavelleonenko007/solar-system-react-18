import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from '../../components/UI/CloseButton/CloseButton';
import styles from './AboutPage.module.scss';

export const AboutPage = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/');
  };
  return (
    <div className={styles.about}>
      <header className={styles.about_header}>
        <div className="container">
          <CloseButton onClick={handleBack} />
        </div>
      </header>
      <main className={styles.about_main}>
        <div className="container container--about">
          <h1 className={styles.about_title}>Now in space</h1>
          <div className={styles.about_content}>
            <p>
              Now in space is an edutainment project about all of humanity’s
              accomplishments in space. So far more than 600 people have been to
              space and humanity managed around 594 space missions. We’ve paid a
              visit – not physically just yet – but with the help of our robotic
              friends, to all of the 8 planets in our Solar System, and to Pluto
              of course and the Voyagers are currently the only human
              spacecrafts who are on their way to interstellar space.
            </p>

            <p>
              We believe that space exploration goes toe to toe with inspiration
              and curiosity about it. We love Christopher Nolan’s Interstellar,
              Ridley Scott’s Marsian and all of the great space classics. We are
              inspired by people like Carl Sagan & Steven Hawking, companies
              like Space X, Blue Origin and Virgin Galactic and we hope that the
              space industry will continue to grow with more people who are bold
              enough to think that we can reach to the stars.
            </p>

            <p>
              This is one of the many reasons why we decided to create “Now in
              Space”. We want to surprise people with how much we, humans, have
              already done and we want to inspire people to want to accomplish
              more. We also believe that space exploration unites humanity, that
              science is a universal language and that the pale blue dot is so
              far our only home and with more understanding of the vastness of
              space, humans, hopefully will cherish it more.
            </p>

            <p>
              Now in Space is a non profit project, a gift to humanity which we
              aim to release this year. To do so, we are very seeking support
              for our product to make it more technically advanced (VR, missions
              3D modeling etc), and of course to translate it to as many
              languages as possible - hopefully launching in at least 3. Our
              main goal is to create the most beautiful “Cosmospedia” available
              for everyone. If you are interested in supporting us, or know
              someone who can (maybe you know Elon Musk 🚀) please reach out to
              us <a href="mailto:efedashko@gmail.com">here</a>, we are very
              grateful for any help!
            </p>

            <p>
              With love from and to Cosmos,
              <br />
            </p>
            <p>
              The Now in Space team & contributors
              <br />
              Kate, Max, Pavel, Vlad, Paul & Chris
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
