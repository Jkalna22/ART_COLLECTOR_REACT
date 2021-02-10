import React, { Fragment } from 'react';

import { fetchQueryResultsFromTermAndValue } from '../api';


const Searchable = ({ searchTerm, searchValue, setIsLoading, setSearchResults }) => {

  return (
    <span className="content">
      <a href="#" onClick={async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
          const result = await fetchQueryResultsFromTermAndValue( searchTerm, searchValue );
          setSearchResults(result);
        } catch (error) {
          console.error(error)
        } finally {
          setIsLoading(false)
        }
      }}>{searchValue}</a>
    </span>
  )
}

const Feature = ({ featuredResult, setIsLoading, setSearchResults }) => {

  if (!featuredResult) {
    return <main id="feature"></main>
  } else {
    const { record: { title, dated, images, primaryimageurl, description, culture,
      style, technique, medium, dimensions, people, department, division, contact, creditline } } = featuredResult;

    return <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>
        <section className="facts">
          {description ?
            <React.Fragment>
              <span className="title">Description</span>
              <span className="content">{description}</span>
            </React.Fragment> : null
          }
          {culture ?
            <React.Fragment>
              <span className="title">Culture</span>
              <span className="content"><Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults} searchTerm={'culture'} searchValue={culture} /></span>
            </React.Fragment> : null
          }
          {style ?
            <React.Fragment>
              <span className="title">Style</span>
              <span className="content">{style}</span>
            </React.Fragment> : null
          }
          {technique ?
            <React.Fragment>
              <span className="title">Technique</span>
              <span className="content"><Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults} searchTerm={'technique'} searchValue={technique} /></span>
            </React.Fragment> : null
          }
          {medium ?
            <React.Fragment>
              <span className="title">Medium</span>
              <span className="content"><Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults} searchTerm={'medium'} searchValue={medium.toLowerCase()} /></span>
            </React.Fragment> : null
          }
          {dimensions ?
            <React.Fragment>
              <span className="title">Dimensions</span>
              <span className="content">{dimensions}</span>
            </React.Fragment> : null
          }
          {people ?
            <React.Fragment>
              <span className="title">People</span>
              {
                people ?
                  people.map((person, idx) => {
                    return <span key={idx} className="content">{person.prefix} <Searchable setIsLoading={setIsLoading} setSearchResults={setSearchResults} searchTerm={'person'} searchValue={person.name} /></span>
                  })
                  : null
              }
            </React.Fragment> : null
          }
          {department ?
            <React.Fragment>
              <span className="title">Department</span>
              <span className="content">{department}</span>
            </React.Fragment> : null
          }
          {division ?
            <React.Fragment>
              <span className="title">Division</span>
              <span className="content">{division}</span>
            </React.Fragment> : null
          }
          {contact ?
            <React.Fragment>
              <span className="title">Contact</span>
              <span className="content">{contact}</span>
            </React.Fragment> : null
          }
          {creditline ?
            <React.Fragment>
              <span className="title">Creditline</span>
              <span className="content">{creditline}</span>
            </React.Fragment> : null
          }
        </section>
        <section className="photos">
          {
            images ?
              images.map((image, idx) => {
                return <img key={idx} src={primaryimageurl} alt={image}></img>
              })
              : null
          }

        </section>
      </div>
    </main>
  }

}

export default Feature;