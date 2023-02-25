import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import PageTitle from '../Common/PageTitle';

export default function ListCandidates() {
    return <>
        <PageTitle title="list of candidates">
            <FeaturedPlayListOutlinedIcon />
        </PageTitle>
        <div className='headerGap'></div>
    </>
}