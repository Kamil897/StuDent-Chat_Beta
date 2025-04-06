import s from './NewsHero.module.scss';
import NewsText from '../NewsText/NewsText';
import FlowingMenu from '../FlowingMenu/FlowingMenu.jsx';

const NewsHero = () => {
  const demoItems = [
    { link: 'https://www.mdis.uz/ru/menu/mdis', text: 'MDIS', image: 'https://avatars.mds.yandex.net/get-altay/1545421/2a0000016ee1c1e28b977f7822641eb1c14a/L_height' },
  ];

  return (
    <>
    <div className={s.newspage}>

        <div className={`${s.h1} ${s.df} `}>
          <h1 id='allnews'>Все новости</h1>

          <div className={s.nav}>
            <a href="#society">Общество</a>
            <a href="#tech">Технологии</a>
            <a href="#culture">Культура</a>
          </div>
      </div>

        <div className={s.new}>
            <NewsText ImgSrc={"https://upload.wikimedia.org/wikipedia/commons/e/ea/BBC_World_News_2022_%28Boxed%29.svg"} p={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi natus, numquam consectetur amet iste architecto repellat excepturi mollitia libero nam aperiam fugit, sunt itaque repudiandae dicta maiores tempora harum maxime. Quidem debitis quibusdam id iure cupiditate. Esse sit iure reiciendis? Illo veniam autem maiores! Nesciunt quas ipsa ullam consectetur tenetur, reprehenderit voluptates omnis, aspernatur aperiam numquam ut provident quis at sed officiis enim voluptate veritatis facilis asperiores recusandae blanditiis debitis repellendus. Nisi, commodi necessitatibus! Tempora ipsum vero labore. Pariatur, fugit at ducimus officiis repellat cum error, iste veniam vitae similique deleniti ipsum reiciendis, libero mollitia harum nobis doloremque recusandae aliquid! Voluptates neque, obcaecati ducimus praesentium alias numquam omnis, mollitia provident labore magnam doloribus beatae! Suscipit odit nisi officiis tenetur laudantium accusantium, quaerat soluta rem animi provident. Quas nulla debitis dolor nostrum dolorem. Ipsa veniam tenetur neque quas natus perspiciatis enim ipsum nemo voluptates? Modi tenetur ullam labore nobis quas. Explicabo pariatur praesentium atque doloremque quibusdam et dolores nisi consectetur fuga. Inventore natus, illum consequatur laboriosam, praesentium omnis provident excepturi ea alias tempore perspiciatis et cum velit. Modi a dignissimos odit ad numquam sapiente aperiam assumenda deleniti hic quas pariatur quasi explicabo perferendis accusamus perspiciatis, quo rerum aliquid dolorum eius expedita molestias asperiores possimus fuga. Nemo doloremque enim voluptatibus consectetur modi? Ducimus necessitatibus veritatis laboriosam, sapiente cum aut assumenda, dolorum est natus ipsam maxime, unde odit pariatur libero? Distinctio labore nihil minus, amet iste explicabo in illo, dolorem fugit ad nisi voluptate! Excepturi nemo accusamus ipsum officiis voluptate eveniet necessitatibus, unde mollitia, quibusdam ab aspernatur? Illum sunt rem est. Maiores quidem asperiores expedita ducimus officia dignissimos nihil reiciendis nisi dolor fuga vero sed quia, minima natus non corporis consequuntur perspiciatis iusto praesentium! Voluptatem explicabo ipsa deleniti ullam corporis dolor, ut distinctio voluptatibus ipsum sed molestiae! Asperiores atque cumque non beatae numquam?"} />
        </div>

        <div className={s.h1}>
          <h1 id='society'>Общество</h1>
        </div>
        
        <div className={s.new}>
          <NewsText ImgSrc={"https://upload.wikimedia.org/wikipedia/commons/e/ea/BBC_World_News_2022_%28Boxed%29.svg"} p={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi natus, numquam consectetur amet iste architecto repellat excepturi mollitia libero nam aperiam fugit, sunt itaque repudiandae dicta maiores tempora harum maxime. Quidem debitis quibusdam id iure cupiditate. Esse sit iure reiciendis? Illo veniam autem maiores! Nesciunt quas ipsa ullam consectetur tenetur, reprehenderit voluptates omnis, aspernatur aperiam numquam ut provident quis at sed officiis enim voluptate veritatis facilis asperiores recusandae blanditiis debitis repellendus. Nisi, commodi necessitatibus! Tempora ipsum vero labore. Pariatur, fugit at ducimus officiis repellat cum error, iste veniam vitae similique deleniti ipsum reiciendis, libero mollitia harum nobis doloremque recusandae aliquid! Voluptates neque, obcaecati ducimus praesentium alias numquam omnis, mollitia provident labore magnam doloribus beatae! Suscipit odit nisi officiis tenetur laudantium accusantium, quaerat soluta rem animi provident. Quas nulla debitis dolor nostrum dolorem. Ipsa veniam tenetur neque quas natus perspiciatis enim ipsum nemo voluptates? Modi tenetur ullam labore nobis quas. Explicabo pariatur praesentium atque doloremque quibusdam et dolores nisi consectetur fuga. Inventore natus, illum consequatur laboriosam, praesentium omnis provident excepturi ea alias tempore perspiciatis et cum velit. Modi a dignissimos odit ad numquam sapiente aperiam assumenda deleniti hic quas pariatur quasi explicabo perferendis accusamus perspiciatis, quo rerum aliquid dolorum eius expedita molestias asperiores possimus fuga. Nemo doloremque enim voluptatibus consectetur modi? Ducimus necessitatibus veritatis laboriosam, sapiente cum aut assumenda, dolorum est natus ipsam maxime, unde odit pariatur libero? Distinctio labore nihil minus, amet iste explicabo in illo, dolorem fugit ad nisi voluptate! Excepturi nemo accusamus ipsum officiis voluptate eveniet necessitatibus, unde mollitia, quibusdam ab aspernatur? Illum sunt rem est. Maiores quidem asperiores expedita ducimus officia dignissimos nihil reiciendis nisi dolor fuga vero sed quia, minima natus non corporis consequuntur perspiciatis iusto praesentium! Voluptatem explicabo ipsa deleniti ullam corporis dolor, ut distinctio voluptatibus ipsum sed molestiae! Asperiores atque cumque non beatae numquam?"} />
        </div>  

        <div className={s.h1}>
          <h1 id='tech'>Технологии</h1>
        </div>
        
        <div className={s.new}>
          <NewsText ImgSrc={"https://upload.wikimedia.org/wikipedia/commons/e/ea/BBC_World_News_2022_%28Boxed%29.svg"} p={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi natus, numquam consectetur amet iste architecto repellat excepturi mollitia libero nam aperiam fugit, sunt itaque repudiandae dicta maiores tempora harum maxime. Quidem debitis quibusdam id iure cupiditate. Esse sit iure reiciendis? Illo veniam autem maiores! Nesciunt quas ipsa ullam consectetur tenetur, reprehenderit voluptates omnis, aspernatur aperiam numquam ut provident quis at sed officiis enim voluptate veritatis facilis asperiores recusandae blanditiis debitis repellendus. Nisi, commodi necessitatibus! Tempora ipsum vero labore. Pariatur, fugit at ducimus officiis repellat cum error, iste veniam vitae similique deleniti ipsum reiciendis, libero mollitia harum nobis doloremque recusandae aliquid! Voluptates neque, obcaecati ducimus praesentium alias numquam omnis, mollitia provident labore magnam doloribus beatae! Suscipit odit nisi officiis tenetur laudantium accusantium, quaerat soluta rem animi provident. Quas nulla debitis dolor nostrum dolorem. Ipsa veniam tenetur neque quas natus perspiciatis enim ipsum nemo voluptates? Modi tenetur ullam labore nobis quas. Explicabo pariatur praesentium atque doloremque quibusdam et dolores nisi consectetur fuga. Inventore natus, illum consequatur laboriosam, praesentium omnis provident excepturi ea alias tempore perspiciatis et cum velit. Modi a dignissimos odit ad numquam sapiente aperiam assumenda deleniti hic quas pariatur quasi explicabo perferendis accusamus perspiciatis, quo rerum aliquid dolorum eius expedita molestias asperiores possimus fuga. Nemo doloremque enim voluptatibus consectetur modi? Ducimus necessitatibus veritatis laboriosam, sapiente cum aut assumenda, dolorum est natus ipsam maxime, unde odit pariatur libero? Distinctio labore nihil minus, amet iste explicabo in illo, dolorem fugit ad nisi voluptate! Excepturi nemo accusamus ipsum officiis voluptate eveniet necessitatibus, unde mollitia, quibusdam ab aspernatur? Illum sunt rem est. Maiores quidem asperiores expedita ducimus officia dignissimos nihil reiciendis nisi dolor fuga vero sed quia, minima natus non corporis consequuntur perspiciatis iusto praesentium! Voluptatem explicabo ipsa deleniti ullam corporis dolor, ut distinctio voluptatibus ipsum sed molestiae! Asperiores atque cumque non beatae numquam?"} />
        </div>

        <div className={s.h1}>
          <h1 id='culture'>Культура</h1>
        </div>

        <div className={s.new}>
          <NewsText ImgSrc={"https://upload.wikimedia.org/wikipedia/commons/e/ea/BBC_World_News_2022_%28Boxed%29.svg"} p={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi natus, numquam consectetur amet iste architecto repellat excepturi mollitia libero nam aperiam fugit, sunt itaque repudiandae dicta maiores tempora harum maxime. Quidem debitis quibusdam id iure cupiditate. Esse sit iure reiciendis? Illo veniam autem maiores! Nesciunt quas ipsa ullam consectetur tenetur, reprehenderit voluptates omnis, aspernatur aperiam numquam ut provident quis at sed officiis enim voluptate veritatis facilis asperiores recusandae blanditiis debitis repellendus. Nisi, commodi necessitatibus! Tempora ipsum vero labore. Pariatur, fugit at ducimus officiis repellat cum error, iste veniam vitae similique deleniti ipsum reiciendis, libero mollitia harum nobis doloremque recusandae aliquid! Voluptates neque, obcaecati ducimus praesentium alias numquam omnis, mollitia provident labore magnam doloribus beatae! Suscipit odit nisi officiis tenetur laudantium accusantium, quaerat soluta rem animi provident. Quas nulla debitis dolor nostrum dolorem. Ipsa veniam tenetur neque quas natus perspiciatis enim ipsum nemo voluptates? Modi tenetur ullam labore nobis quas. Explicabo pariatur praesentium atque doloremque quibusdam et dolores nisi consectetur fuga. Inventore natus, illum consequatur laboriosam, praesentium omnis provident excepturi ea alias tempore perspiciatis et cum velit. Modi a dignissimos odit ad numquam sapiente aperiam assumenda deleniti hic quas pariatur quasi explicabo perferendis accusamus perspiciatis, quo rerum aliquid dolorum eius expedita molestias asperiores possimus fuga. Nemo doloremque enim voluptatibus consectetur modi? Ducimus necessitatibus veritatis laboriosam, sapiente cum aut assumenda, dolorum est natus ipsam maxime, unde odit pariatur libero? Distinctio labore nihil minus, amet iste explicabo in illo, dolorem fugit ad nisi voluptate! Excepturi nemo accusamus ipsum officiis voluptate eveniet necessitatibus, unde mollitia, quibusdam ab aspernatur? Illum sunt rem est. Maiores quidem asperiores expedita ducimus officia dignissimos nihil reiciendis nisi dolor fuga vero sed quia, minima natus non corporis consequuntur perspiciatis iusto praesentium! Voluptatem explicabo ipsa deleniti ullam corporis dolor, ut distinctio voluptatibus ipsum sed molestiae! Asperiores atque cumque non beatae numquam?"} />
        </div>
      
        <div style={{ height: '180px', position: 'relative', marginTop: '50px'}}>
          <FlowingMenu items={demoItems} />
        </div>
    </div>
    </>
  )
}

export default NewsHero