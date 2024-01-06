import { Card, CardActions, CardContent, CardMedia, IconButton ,Typography} from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa"
import useBlogs from "@/src/Hooks/useBlogs";
import Link from "next/link";

const ManageBlog = () => {
    const { blogData, handelBlogDelete } = useBlogs()

    return (
        <section>
            <div className='flex flex-col items-center justify-center w-full '>
                <div
                    className='text-4xl font-bold text-center text-gray-700'
                >
                    <Link
                        href={'/dashboard/blog'}
                        className="border px-4 py-2"
                    >
                        Blog
                    </Link>
                </div>


                <div className="my-4">
                    <div className="grid md:grid-cols-3 gap-4 justify-center items-center">
                        {blogData &&
                            blogData?.length &&
                            blogData?.map((pd) => {
                                const { _id, image, title } = pd;
                                return (
                                    <Card sx={{ maxWidth: 400 }} key={_id}>
                                        <CardMedia
                                            component="img"
                                            image={image}
                                            alt={"Brand Image  "}
                                            className="w-auto h-auto object-cover"
                                        />
                                        <div>
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {title}
                                                </Typography>
                                            </CardContent>
                                        </div>

                                        <CardActions disableSpacing>
                                            <IconButton
                                                aria-label="Delete"
                                                onClick={() => handelBlogDelete(_id)}
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
        </section>
    )
}

export default ManageBlog;