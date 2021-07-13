import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions
                this.props.emotions.map(emotion => (
                    <tr>
                        <td>{emotion.label}</td>
                        <td>{emotion.score}</td>
                    </tr>
                ))
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
