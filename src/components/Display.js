import React, { useEffect, useRef }  from 'react';

const A4_PAGE_RATIO = Math.sqrt(2);

const Display = props => {
  const { document } = props;
  const { questions, title } = document;

  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.style.height = pageRef.clientWidth * A4_PAGE_RATIO + 'px';
    }
  });

  if (questions){
    return (
      <section ref={pageRef} className="section__display">
        <div className="page">
          <h1 className="page__title">{ title }</h1>
          <div className="page__section">
            { questions.map(( question_array ) => {
              return (
                <div className="page__column">
                {
                  question_array.map((question_str) => {
                    return <p>{question_str}</p>;
                  })
                }
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}

export default Display;
