import Link from 'next/link'
import myLogo from '@/public/images/logo.png'

export default function Logo() {
  return (
    <Link className="block" href="/">
      <img src={myLogo.src} width={80} height={80}/>
    </Link>
  )
}
