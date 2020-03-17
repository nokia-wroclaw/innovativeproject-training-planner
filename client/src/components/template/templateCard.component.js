import React from 'react';

const TemplateCard = () => {

    return(
        <div class="row">
        <div class="col s12 m12">
          <div class="card blue darken-2">
            <div class="card-content white-text">
              <span class="card-title">Training Title</span>
              <p>Training description.Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Proin nibh augue, suscipit a, scelerisque sed, lacinia in, mi. Cras vel lorem. 
              Etiam pellentesque aliquet tellus. Phasellus pharetra nulla ac diam. Quisque semper
              justo at risus. Donec venenatis, turpis vel hendrerit interdum, dui ligula ultricies 
              purus, sed posuere libero dui id orci.</p>
              <p>Training instructor. Date and time when start.</p>
            </div>
            <div class="card-action">
              <a href="#">Send invite</a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default TemplateCard;