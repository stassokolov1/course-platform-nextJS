import {Button, Htag, Input, Ptag, Textarea} from "../components";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";

function Home({ menu }: HomeProps): JSX.Element {

    return (
        <>
            <Htag tag='h1'>Текст</Htag>
            <Button appearance='primary'>Узнать подробнее</Button>
            <Button appearance='ghost' arrow='right'>Читать отзывы</Button>
            <Button appearance='ghost' arrow='down'>Читать отзывы</Button>
            <Ptag size='s'>Параграф текста</Ptag>
            <Ptag>Параграф</Ptag>
            <Input placeholder='Тест'/>
            <Textarea placeholder='Тест'/>
        </>
    );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0;
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        props: {
            menu,
            firstCategory
        }
    };
};

export interface HomeProps extends Record<string, unknown> {
    menu: MenuItem[]
    firstCategory: number
}