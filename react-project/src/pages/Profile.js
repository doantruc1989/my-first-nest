import React from 'react';

function Profile() {
    return (
        <div className="container">
            <div className="card" style={{ width: '18rem' }}>
                <img src={
                    'https://khoinguonsangtao.vn/wp-content/uploads/2022/05/anh-avatar-dep-ngau-hinh-dai-dien.jpg'} className="card-img-top" alt={'alo'} />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    );
}

export default Profile;
