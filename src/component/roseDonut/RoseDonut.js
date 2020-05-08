import React from "react";
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

class RoseDonut extends React.Component {
  render() {
    const data = [
      {
        year: "2001",
        population: 41.8
      },
      {
        year: "2002",
        population: 38
      },
      {
        year: "2003",
        population: 33.7
      },
      {
        year: "2004",
        population: 30.7
      },
      {
        year: "2005",
        population: 25.8
      },
      {
        year: "2006",
        population: 31.7
      },
      {
        year: "2007",
        population: 33
      },
      {
        year: "2008",
        population: 46
      },
      {
        year: "2009",
        population: 38.3
      },
      {
        year: "2010",
        population: 28
      },
      {
        year: "2011",
        population: 42.5
      },
      {
        year: "2012",
        population: 30.3
      }
    ];

    return (
      <div>
        <Chart height={290} data={data} padding={[15,30,10,5]} forceFit>
          <Coord type="polar" innerRadius={0.5} />
          <Tooltip />
          <Legend
            offsetX={-35}
            position="right-center"
          />
          <Geom
            type="interval"
            color="year"
            opacity={0.4}
            position="year*population"
            style={{
              lineWidth: 1,
              stroke: "#fff"
            }}
          >
            <Label
              content="year*population"
              // offset={}
              textStyle= {{
                textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                fill: '#404040', // 文本的颜色
                fontSize: '12', // 文本大小
                fontWeight: 'bold', // 文本粗细
                textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
              }}
              autoRotate= {false}
              formatter={(val, item) => {
                return val;
              }}
            />
          </Geom>
        </Chart>
      </div>
    );
  }
}
export default RoseDonut
