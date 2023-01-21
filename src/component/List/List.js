import React from 'react';

const List = ({items,removeItem,editItem}) => {
    return (
        <div className='container'>
            {items.map ((item)=>{
                const {id,title} =item;
                return(
                    <ul className='list-group list-group-flush' key={id}>
                        <li className='list-group-item flex justify-between items-center'>
                            {title}
                            <div style={{float: 'right'}}>
                            <button className="btn btn-info"  onClick={()=> editItem(id)}>Edit</button>
                            <button className="btn btn-error"  onClick={()=> removeItem(id)}>Delete</button>
                              
                            </div>

                        </li>
                    </ul>
                )
            })}
        </div>
    );
};

export default List;