import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { deleteBlogsUrl, getBlogsUrl } from "../Utils/Urls/BlogUrl";

const useBlogs = () => {
    const {
        data: blogData,
        isLoading: blogLoaded,
        refetch: refetchBlog,
    } = useQuery({
        queryKey: ["blogData"],
        queryFn: async () => {
            try {
                const res = await fetch(getBlogsUrl);
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await res.json();
                return data.data;
            } catch (error) {
                console.error("Error fetching data:", error);
                throw error;
            }
        },
    });
    const handelBlogDelete = async (id) => {
        const confirmed = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (confirmed.isConfirmed) {
            const res = await fetch(deleteBlogsUrl(id), {
                method: "DELETE",
            });
            const data = await res.json();
            if (!data) {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: data.message,
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "error",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
            } else {
                Swal.fire({
                    position: "center",
                    timerProgressBar: true,
                    title: "Successfully Delete !",
                    iconColor: "#ED1C24",
                    toast: true,
                    icon: "success",
                    showClass: {
                        popup: "animate__animated animate__fadeInRight",
                    },
                    hideClass: {
                        popup: "animate__animated animate__fadeOutRight",
                    },
                    showConfirmButton: false,
                    timer: 3500,
                });
                refetchBlog();
            }
        }
    };

    return {
        blogData,
        blogLoaded,
        refetchBlog,
        handelBlogDelete
    };
};

export default useBlogs;