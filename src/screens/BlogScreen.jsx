import React from 'react'
import { Container, Image, Row } from 'react-bootstrap'
import YouTube from "react-youtube";
var cElement = null;

const BlogScreen = () => {
    const opts = {
        height: "390",
        width: "640",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0
        }
    };
    const _onReady = event => {
        console.log("_onReady");
        cElement = event;
        // event.target.playVideo();
    };

    const _onStateChange = event => {
        // event.target.pauseVideo()
    };
    return (
        <Container className='py-4'>
            <Row className='pb-4'>
                <h3 className='text-center'>Vào bếp cùng HDK</h3>
            </Row>
            <Row className='pb-4'>
                <h5>Chuyên mục: Hôm nay ăn gì?</h5>
            </Row>
            <Row>
                <Row>
                    <h4 className='pb-2'>1. Canh chua cá lóc</h4>
                </Row>
                <Row>
                    <Image style={{ width: '50%', padding: '20px', margin: '0 auto' }} src='https://images.aws.nestle.recipes/resized/0265031f34f7b013bd146bfe347e501f_Thumb-crop_(4)_944_531.jpg'></Image>
                </Row>
                <Row>
                    <p>- Nguyên liệu chuẩn bị: Cá lóc (500gr), Thơm (1/4 quả), Cà chua (2 trái), Đậu bắp (50gr), Bạc hà (50gr), Me vắt (20gr)
                        Giá (50gr), Ngò gai (1 nhánh), Nước mắm (1 muỗng).
                    </p>
                    <strong>- Bước 1: Sơ chế cá lóc
                    </strong>
                    <p>Cá lóc sau khi làm thịt bạn dùng muối chà đều khắp mình cá sau đó rửa lại 2 lần với nước sạch và dùng dao cắt thành các khúc vừa ăn có chiều dài khoảng 1.5 lóng tay.
                        Tiếp theo bạn cho cá vừa cắt vào tô cùng 1 muỗng canh nước mắm, 1/2 muỗng canh hạt nêm và 1/2 muỗng canh tiêu rồi muỗng trộn đều cho các gia vị tan ra và ướp trong khoảng 15 phút cho cá thấm đều gia vị.
                    </p>
                    <strong>- Bước 2: Sơ chế rau ăn kèm
                    </strong>
                    <p>Thơm bạn gọt sạch vỏ sau đó cắt thành các miếng vừa ăn. Cà chua mua về bạn cũng đem đi rửa sạch rồi cắt thành các múi cau nhỏ.
                        Giá đỗ bạn rửa 2 lần với nước. Ngò gai và rau ngổ bạn rửa sạch, cắt nhỏ.
                        Với đậu bắp bạn chỉ cần rửa sạch bỏ đầu và cắt chéo. Còn bạc hà bạn tước bỏ lớp vỏ bên ngoài và cũng cắt xéo như đậu bắp.
                    </p>
                    <strong>- Bước 3: Nấu nước cốt me
                    </strong>
                    <p>Để lấy nước cốt me bạn cho me vắt cùng 1 muỗng canh nước ấm khoảng 60 độ C vào chén sau đó dùng muỗng dầm đều cho thịt me mềm ra.
                        Tiếp theo bạn đun 1 lít nước cho đến khi nước sôi lăn tăn bạn cho me vừa dầm mềm vào, trộn đều và nấu đến khi nước sôi.
                    </p>
                    <strong>- Bước 4: Nấu canh
                    </strong>
                    <p>Sau khi nước cốt me được đun sôi bạn cho cá lóc vào nấu khoảng 10 phút rồi dùng muỗng vớt bọt canh ra và cho tiếp cà chua, thơm, đậu bắp, giá đỗ và bạc hà vào.
                        Trộn đều sau đó cho thêm 1 muỗng canh đường nữa vào nồi, nấu đến khi nước sôi lại bạn nêm nếm lại gia vị cho vừa ăn rồi tắt bếp, múc vào tô, rắc thêm 1 ít rau ngổ và ngò gai lên trên là hoàn tất.
                    </p>
                    <strong>- Bước 5: Thành phẩm
                    </strong>
                    <p>Canh chua cá lóc sau khi hoàn tất sẽ có mùi thơm quyến rũ. Khi ăn ta sẽ cảm nhận được vị chua của me và cà chua hòa với cùng vị ngọt của thịt cá lóc và vị chua nhẹ của thơm.
                        Ăn cùng với cơm trắng hoặc bún tươi chấm cùng với 1 chén nước mắm mặn nữa thì thôi ôi ngon khỏi chê luôn á!
                    </p>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"-BpYgR0_JoA"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo nấu canh chua cá lóc. Nguồn: Hoshi Phan</i>
                </Row>
            </Row>
            <Row>
                <Row>
                    <h4 className='pb-2'>2. Cánh gà chiên nước mắm</h4>
                </Row>
                <Row>
                    <Image style={{ width: '50%', padding: '20px', margin: '0 auto' }} src='https://cdn.tgdd.vn/Files/2020/04/04/1246636/chia-se-cach-lam-canh-ga-chien-nuoc-mam-thom-ngon-kho-cuong-202202251510579911.jpg'></Image>
                </Row>
                <Row>
                    <p>- Nguyên liệu chuẩn bị: Cánh gà, rau xà lách, bột mì, hành tím, tỏi, dầu ăn, nước mắm, đường.
                    </p>
                    <strong>- Bước 1: Sơ chế nguyên liệu
                    </strong>
                    <p>Cánh gà mua về rửa thật sạch với nước và để ra rổ cho ráo, để cánh gà khi chiên được giòn và ngon hơn bạn cho 2 muỗng canh bột mì vào trộn đều và để trong vòng 5 phút.

                        Xà lách mua về nhặt từng lá, rửa sạch 2 - 3 lần với nước và để ra rổ.

                        Hành và tỏi lột vỏ, rửa sơ qua nước và băm nhuyễn.</p>
                    <strong>- Bước 2: Chiên cánh gà
                    </strong>
                    <p>Đầu tiên bắc chảo lên bếp, sau đó cho 3 muỗng canh dầu ăn vào và đun với lửa nhỏ. Tiếp đến lấy đũa thử dầu, nếu nổi bong bóng là dầu đã nóng, lúc này mình mới cho cánh gà vào chiên.

                        Tiếp tục chiên cánh gà cho đến khi vàng giòn đều hết hai mặt, sau đó cho ra dĩa và tắt bếp.</p>
                    <strong>- Bước 3: Làm nước sốt
                    </strong>
                    <p>Phần dầu ăn trong chảo bạn lấy ra, chỉ để còn 1 lượng ít đủ để xào hành và tỏi. Sau khi phi hành tỏi đã vàng thơm rồi thì cho vào chảo 1 muỗng canh nước mắm và 1 muỗng canh đường.

                        Các bạn đun với lửa vừa đến khi nước sốt sánh mịn lại, nêm nếm gia vị sao cho vừa ăn thì tắt bếp, trang trí thêm một ít rau xà lách và rưới nước sốt lên cánh gà.</p>
                    <strong>- Bước 4: Thành phẩm
                    </strong>
                    <p>Vậy là chúng ta đã hoàn thành xong món cánh gà chiên nước mắm cực kì thơm ngon mà lại đơn giản vô cùng, miếng cánh gà giòn rụm cùng với nước sốt ngon ngọt sánh mịn chan với cơm trắng, cả nhà ăn ai nấy đều khen nức nở.</p>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"H-nq2TSu9oU"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo cánh gà chiên nước mắm. Nguồn: Hoshi Phan</i>
                </Row>
            </Row>
            <Row>
                <Row>
                    <h4 className='pb-2'>3. Cá thu tươi sốt cà</h4>
                </Row>
                <Row>
                    <Image style={{ width: '50%', padding: '20px', margin: '0 auto' }} src='https://cdn.tgdd.vn/Files/2020/05/30/1259475/cach-lam-ca-hoi-sot-ca-chua-thom-ngon-dam-da-hap-dan-dua-com-10.jpg'></Image>
                </Row>
                <Row>
                    <p>- Nguyên liệu chuẩn bị: Cá thu ngon, cà chua, tỏi, hành khô, gừng, hành lá, thì là, ớt tươi.
                    </p>
                    <strong>- Bước 1: Sơ chế nguyên liệu
                    </strong>
                    <p>Rửa sạch miếng cá thu với nước muối pha loãng, sau đó vớt ra để ráo.

                        Các nguyên liệu khác rửa sạch và cắt miếng, cụ thể: Cà chua rửa sạch, thái múi cau; hành lá, thì là rửa sạch, cắt khúc; tỏi, hành bóc vỏ, đập dập, băm nhỏ; gừng nạo vỏ, thái sợi hoặc băm nhỏ.</p>
                    <strong>- Bước 2: Chiên cá
                    </strong>
                    <p>Đổ dầu vào chảo, đun mỡ nóng già sau đó thả miếng cá thu vào rán qua. Lật đều để cá thu chín 2 mặt, rán đến khi thấy cá ngả sang màu vàng nhạt thì tắt bếp, cho cá ra đĩa. Rán qua cá sẽ giúp cá thu thơm và khi ăn có vị bùi.</p>
                    <strong>- Bước 3: Làm nước sốt cà chua
                    </strong>
                    <p>Dùng 2 thìa dầu ăn vừa rán cá đổ vào chảo, phi thơm hành, rồi đến tỏi và sau đó là gừng. Đảo đều tay đến khi hành, tỏi, gừng vàng ươm đẹp mắt thì cho cà chua vào xào cùng. Bạn nên để lại 1 ít cà chua để sau khi món cá thu sốt gần hoàn thành thì cho vào, món ăn sẽ thêm phần đẹp mắt.

                        Tiếp đó, cho miếng cá thu vào sốt cùng cà chua, nêm nếm gia vị vừa ăn và thêm 1/2 thìa hạt tiêu rồi để lửa nhỏ liu riu. Lật đều 2 mặt cá để cá thu thấm gia vị.

                        Sau khi miếng cá thu chín mềm, nước sốt cà chua quánh mịn lại thì cho nốt cà chua còn lại vào, nấu thêm 1 phút nữa rồi thả hành lá thì là vào đảo đều tay.

                        Cuối cùng, cho miếng cá ra đĩa, sau đó rưới nước sốt cà chua phủ lên trên.</p>
                    <strong>- Bước 4: Thành phẩm
                    </strong>
                    <p>Miếng cá thu vàng sậm, sốt cà chua đỏ cam tươi tắn điểm xuyết thêm màu xanh của hành lá. Món cá thu sốt cà chua thơm đậm đà mùi cá biển, khi ăn cảm nhận rất rõ vị mặn ngọt quyện vào nhau rất hài hòa.</p>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"A5Rk8RnnoN0"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo cánh gà chiên nước mắm. Nguồn: Ăn gì đây?</i>
                </Row>
            </Row>
            <Row>
                <Row>
                    <h4 className='pb-2'>4. Thịt heo kho tiêu</h4>
                </Row>
                <Row>
                    <Image style={{ width: '50%', padding: '20px', margin: '0 auto' }} src='https://cdn.tgdd.vn/2021/01/CookProduct/Thitkhotieu-1200x676.jpg'></Image>
                </Row>
                <Row>
                    <p>- Nguyên liệu chuẩn bị: Thịt ba chỉ, ớt, hành tím băm, tỏi băm, nước mắm, tiêu hạt, gia vị.
                    </p>
                    <strong>- Bước 1: Sơ chế nguyên liệu
                    </strong>
                    <p>Thịt ba chỉ mua về dùng muối chà xát, sau đó rửa lại với nước sạch.

                        Bạn đun 1 nồi nước lên đợi khoảng 1 phút cho nước trong nồi sôi bùng lên thì lấy thịt bỏ vào, chần sơ với lửa to trong khoảng 3 phút thì vớt thịt ra và rửa lại với nước sạch.
                        Sau khi đã rửa thịt lại bằng nước sạch thì bạn cắt thịt thành các miếng nhỏ vừa ăn khoảng 1/2 lóng tay rồi cho vào tô lớn.

                        Tiếp đến, bạn nêm 1 muỗng cà phê đường, 1 muỗng cà phê bột ngọt, 1 muỗng cà phê hạt nêm, 1 muỗng cà phê tiêu rồi trộn đều tất cả lên.

                        Cuối cùng, bạn bỏ phần hành tím, tỏi băm vào và trộn đều lên, để yên cho thịt thấm gia vị khoảng 20 phút.</p>
                    <strong>- Bước 2: Kho thịt
                    </strong>
                    <p>Cho đường vào nồi cùng 1 muỗng canh nước để thắng đường làm nước màu.

                        Khi thấy nước đường sôi lên và chuyển màu nâu đẹp thì cho thịt vào xào cho săn thịt lại rồi đổ 150ml nước vào rồi cho ớt vào.

                        Nấu được khoảng 10 phút thì bạn cho 1 muỗng canh nước mắm vào, hạ nhỏ lửa và tiếp tục nấu thêm 2 phút.

                        Đến khi nước thịt sôi lên lần nữa và bắt đầu cạn thì nêm nếm cho vừa ăn, tắt bếp, bỏ vào 1 muỗng canh tiêu hạt vào nữa là hoàn thành.

                        Cuối cùng, chúng ta chỉ cần múc ra dĩa là đã có ngay một món thịt kho tiêu nóng hổi thơm ngon rồi.</p>
                    <strong>- Bước 3: Thành phẩm
                    </strong>
                    <p>Thịt ba chỉ kho tiêu sau khi hoàn thành sẽ có màu sắc óng ánh, với mùi thơm đặc biệt của tiêu. Khi ăn vào bạn sẽ cảm thấy vị béo ngậy của mỡ thịt cùng với vị hơi cay cay của nước thịt kho. Ăn với cơm trắng là bao hết ý phải không nào?</p>
                </Row>
                <Row >
                    <YouTube className='d-flex justify-content-center'
                        videoId={"AueQhwjp4Lg"}
                        opts={opts}
                        onReady={_onReady}
                        onStateChange={_onStateChange}
                    />
                    <i className='text-center py-3'>Video tham khảo nấu món thịt heo kho tiêu. Nguồn: Món ăn ngon</i>
                </Row>
            </Row>
        </Container>
    )
}

export default BlogScreen