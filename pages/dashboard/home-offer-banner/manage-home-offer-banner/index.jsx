import useHomeSlider from "@/src/Hooks/useHomeSlider";
import DashboardLayout from "@/src/Layouts/DashboardLayout"
import { Card, CardActions, CardMedia, IconButton,Typography } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import  useMediaHooks  from '@/src/Hooks/useMediaHooks';
import Link from 'next/link';


const ManageHomeOfferBannerPage = () => {
    const {
        handelBannersDelete,
        bannersData,
        refetchBanners,} = useMediaHooks()

    return (
        <DashboardLayout>
            <div>
                <div className="my-4">
                    <Link
                        className="border px-4 py-2"
                        href={'/dashboard/home-offer-banner/add-home-offer-banner'}>
                        Manage Home Offer Four
                    </Link>
                </div>

                <div>
                    <div className="grid md:grid-cols-3 gap-4 justify-center items-center">
                        {bannersData &&
                            bannersData?.length &&
                            bannersData?.map((slider) => {
                                const { _id, bannerTow } = slider;
                                return (
                                    <Card sx={{ maxWidth: 400 }} key={_id}>
                                        <CardMedia
                                            component="img"
                                            image={bannerTow}
                                            alt={"Brand Image  "}
                                            className="w-auto h-auto object-cover"
                                        />

                                        <CardActions disableSpacing>
                                            <IconButton
                                                aria-label="Delete"
                                                onClick={() => handelBannersDelete(_id)}
                                            >
                                                <FaRegTrashAlt className="text-[2.3rem] mr-3 text-red-500" />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                                );
                            })}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default ManageHomeOfferBannerPage