// U54107257
document.addEventListener('DOMContentLoaded', () => {
    const data = [100, 420, 230, 850, 560, 925];

    // Define dimensions
    const width = 500;
    const barHeight = 20;
    const margin = 1;
    const height = (barHeight + margin) * data.length;

    // Select the SVG container and set dimensions
    const svg = d3.select('#chart')
        .attr('width', width)
        .attr('height', height);

    // Configure the linear scale for x-axis
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range([50, width]);

    // Render bars
    const barGroup = svg.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', (d, i) => `translate(0, ${i * (barHeight + margin)})`);

    barGroup.append('rect')
        .attr('class', 'bar')
        .attr('width', 0)  // Start width at 0 for transition effect
        .attr('height', barHeight)
        .attr('fill', 'steelblue')
        .transition()  // Transition effect for bar growth
        .duration(1000)
        .attr('width', d => xScale(d));

    // Add text labels
    barGroup.append('text')
        .attr('class', 'label')
        .attr('x', d => xScale(d) + 5)
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(d => d);

    // Add hover effect
    barGroup.selectAll('rect')
        .on('mouseover', function() {
            d3.select(this).attr('fill', 'firebrick');
        })
        .on('mouseout', function() {
            d3.select(this).attr('fill', 'steelblue');
        });
});

