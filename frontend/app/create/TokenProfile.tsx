// import React, { useEffect, useState } from 'react';
// import abi from "./../contract/LaunchpadFactory.json";
// import { useAccount, useReadContract } from 'wagmi';
// import { LAUNCHPADFACTORY_ADDRESS } from '@/app/contract/addresses';
// import TokenInfo from '../contract/token/tokenInfo';
// import { UploadButton } from '@/utils/uploadthing';
// import Image from 'next/image';

// const TokenProfile: React.FC = () => {
//   const { address } = useAccount()
//   const [launchpads, setLaunchpads] = useState<`0x${string}`[]>([])
//   const [lastLaunchpad, setLastLaunchpad] = useState<`0x${string}` | null>(null)
//   const [uploadStatus, setUploadStatus] = useState<{ message: string, isError: boolean } | null>(null)
//   const [tokenImageUrl, setTokenImageUrl] = useState<string | null>(null)

//   const { data: userLaunchpads } = useReadContract({
//     address: LAUNCHPADFACTORY_ADDRESS,
//     abi: abi,
//     functionName: 'getLaunchpadsByOwner',
//     args: [address],
//   })

//   useEffect(() => {
//     if (userLaunchpads) {
//       const launchpadAddresses = userLaunchpads as `0x${string}`[]
//       setLaunchpads(launchpadAddresses)
//       setLastLaunchpad(launchpadAddresses[launchpadAddresses.length - 1] || null)
//     }
//   }, [userLaunchpads])

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
//       <p className="mb-4">Welcome to your profile page!</p>

//       <h2 className="text-xl font-semibold mb-2">Your Launchpads</h2>
//       {launchpads.length > 0 ? (
//         <>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold">Last Launchpad Address:</h3>
//             <p className="font-mono">{lastLaunchpad}</p>
//             <TokenInfo
//               contractAddress={lastLaunchpad as `0x${string}`}
//               userAddress={address}
//               icon={<div className="w-8 h-8 bg-blue-500 rounded-full"></div>}
//             />
//           </div>
//           <div className="mt-4">
//             <h3 className="text-lg font-semibold mb-2">Token Picture</h3>
//             {tokenImageUrl ? (
//               <div className="mb-4">
//                 <Image src={tokenImageUrl} alt="Token" width={200} height={200} className="rounded-lg" />
//               </div>
//             ) : (
//               <p className="mb-2">No token picture uploaded yet.</p>
//             )}
//             <h4 className="text-md font-semibold mb-2">Upload New Token Picture</h4>
//             <UploadButton
//               endpoint="imageUploader"
//               onClientUploadComplete={(res) => {
//                 if (res && res.length > 0) {
//                   console.log("Files: ", res);
//                   setTokenImageUrl(res[0].url);
//                   setUploadStatus({ message: "Upload Completed", isError: false });
//                 }
//               }}
//               onUploadError={(error: Error) => {
//                 setUploadStatus({ message: `ERROR! ${error.message}`, isError: true });
//               }}
//             />
//             {uploadStatus && (
//               <div className={`mt-2 p-2 rounded ${uploadStatus.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
//                 {uploadStatus.message}
//               </div>
//             )}
//           </div>
//         </>
//       ) : (
// import Image from 'next/image';

// // ... (other imports and code)

// export default function DeployToken() {
//     // ... (other state and hooks)

//     return (
//         <>
//             <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
//                 <h1 className="text-2xl font-bold mb-6 text-white">Deploy a Token</h1>
//                 <p className="text-green-400 text-sm mb-4">Form filled with random values. You can edit them if needed.</p>
//                 {tokenImageUrl ? (
//                     <div className="mb-4">
//                         <Image src={tokenImageUrl} alt="Token" width={200} height={200} className="rounded-lg" />
//                     </div>
//                 ) : (
//                     <p className="mb-2">No token picture uploaded yet.</p>
//                 )}
//                 {/* ... (rest of the component) */}
//             </div>
//         </>
//     );
// }
//         <p>You haven't created any launchpads yet.</p>
//       )}
//     </div>
//   )
// };

// export default TokenProfile;