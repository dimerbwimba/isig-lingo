import styles from "./Loading.module.css"
const Loading = () => {
    return ( 
        <div className=" h-full flex items-center justify-center ">
            <div className={styles.bouncingLoader}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
     );
}
 
export default Loading;