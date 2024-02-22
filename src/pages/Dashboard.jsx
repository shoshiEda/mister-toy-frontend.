import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend,   RadialLinearScale} from 'chart.js'
import { Doughnut, PolarArea ,Line } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import { CategoryScale, LinearScale,PointElement,LineElement,Title } from 'chart.js'
import faker from 'faker'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
  )


ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

export function Dashboard() {
    const labels  = useSelector(storeState => storeState.toyModule.labels)


    const data = {
        labels,
        datasets: [
            {
                //label: '# of Votes',
                data: [12, 19, 3,25,49,12,10,28],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(133, 132, 235, 0.2)',
                    'rgba(235, 139, 34, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(133, 132, 235, 1)',
                    'rgba(235, 139, 34, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const data2 = {
        labels,
        datasets: [
            {
                
                data: [12, 13, 3,15,19,12,10,16],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(133, 132, 235, 0.2)',
                    'rgba(235, 139, 34, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(133, 132, 235, 1)',
                    'rgba(235, 139, 34, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }
   
    const options = {
      responsive: true,
      plugins: {
        legend: {
          //position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Chart',
        },
      },
    };
    
    
     const data3 = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Dataset 2',
          data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }
    



    return (
        <section style={{maxWidth:'60vw', margin:'auto'}}>
            <h1>Prosentage of toys by labels</h1>
            <Doughnut data={data2} />
            <hr />
            <h1>Prices for Products</h1>
            <PolarArea data={data} />
            <Line options={options} data={data3} />
        </section>
    )

   
}
