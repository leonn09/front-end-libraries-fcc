const title = d3
  .select('body')
  .append('h1')
  .attr('id', 'title')
  .text('Barchart with D3.js');

const h = 400;
const w = 800;
const padding = 50;

const svg = d3
  .select('body')
  .append('svg')
  .attr('width', w)
  .attr('height', h);

const tooltip = d3
  .select('body')
  .append('div')
  .attr('id', 'tooltip')
  .style('position', 'absolute')
  .style('visibility', 'hidden')
  .style('background', 'rgba(0,0,0,0.7)')
  .style('color', 'white')
  .style('padding', '6px')
  .style('border-radius', '4px')
  .style('font-size', '12px');

fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(data => {
    const dataset = data.data;

    const xScale = d3
      .scaleTime()
      .domain([new Date(dataset[0][0]), new Date(dataset[dataset.length - 1][0])])
      .range([padding, w - padding]);
      
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d[1])])
      .range([h - padding, padding]);


    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append('g')
      .attr('transform', `translate(0, ${h - padding})`)
      .attr('id', 'x-axis')
      .call(xAxis);
    
    svg
      .append('g')
      .attr('transform', `translate(${padding}, 0)`)
      .attr('id', 'y-axis')
      .call(yAxis);

    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(new Date(d[0])))
      .attr('y', d => yScale(d[1]))
      .attr('width', (w - 2 * padding) / dataset.length)
      .attr('height', d => h - padding - yScale(d[1]))
      .attr('fill', 'teal')
      .attr('data-date', d => d[0])
      .attr('data-gdp', d => d[1])

      .on('mouseover', (event, d) => {
        tooltip
          .style('visibility', 'visible')
          .attr('data-date', d[0])
          .html(`${d[0]}<br>$${d[1]} Billion`)
          .style('top', event.pageY - 40 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })
      .on('mouseout', () => tooltip.style('visibility', 'hidden'));

    svg
      .append('text')
      .attr('x', w / 2)
      .attr('y', padding / 2)
      .attr('text-anchor', 'middle')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .text('U.S. GDP Over Time');
  });