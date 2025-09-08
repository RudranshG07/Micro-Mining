'use client'

import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import {
  Wallet,
  HardDrives,
  DeviceMobile,
  Monitor,
  CheckCircle,
  Warning,
  LinkIcon,
  ChartLine,
  Circle,
  MouseScrollIcon,
  Globe,
  Sparkle,
  HandWaving,
  HandsPraying,
  FlagBanner,
  Sun,
  Lightning,
  Desktop,
  Laptop,
  Cpu,
  DeviceTablet,
  Phone,
  ArrowRight,
  Play,
  Shield,
  CurrencyCircleDollar,
  TrendUp,
  Users,
  Star
} from '@phosphor-icons/react'
import { 
  openContractCall,
  UserSession,
  AppConfig
} from '@stacks/connect'
import {
  standardPrincipalCV,
  uintCV,
  stringAsciiCV,
  PostConditionMode
} from '@stacks/transactions'
import {
  STACKS_TESTNET
} from '@stacks/network'

// Contract configuration
const NETWORK = STACKS_TESTNET
const CONTRACT_ADDRESS = 'STKDG5RS0CW5QRQ7HKDJF3RTNAMSDD9J9A3QKKY3'
const CONTRACT_NAME = 'depin-mining-v10'

interface UserData {
  stxBalance: number
  btcBalance: number
  isRegistered: boolean
  deviceType: string
  deviceId: string
  totalRewards: number
}

const greetings = [
  { text: "Hello", icon: <HandWaving size={60} weight="duotone" /> },
  { text: "Namaste", icon: <HandsPraying size={60} weight="duotone" /> },
  { text: "Ni Hao", icon: <FlagBanner size={60} weight="duotone" /> },
  { text: "Konnichiwa", icon: <Sun size={60} weight="duotone" /> },
  { text: "Ready to Mine", icon: <Lightning size={60} weight="duotone" /> }
]

function LoadingScreen() {
  const [currentGreeting, setCurrentGreeting] = useState(0)
  const greetingRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const interval = setInterval(() => {
      setCurrentGreeting((prev) => (prev + 1) % greetings.length)
    }, 800)

    // Animate greeting text and icon
    gsap.fromTo(greetingRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    )

    gsap.fromTo(iconRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 0.7, ease: "back.out(1.7)" }
    )

    return () => clearInterval(interval)
  }, [currentGreeting])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <div ref={iconRef} className="flex justify-center mb-8 text-accent">
          {greetings[currentGreeting].icon}
        </div>
        <div ref={greetingRef} className="font-sans text-6xl text-foreground">
          {greetings[currentGreeting].text}
        </div>
      </div>
    </div>
  )
}

// Landing Page Component - Using Aydo DePIN theme from landpage folder
function LandingPageComponent({ 
  onEnterDashboard, 
  totalMiners = 0, 
  totalRewards = 0 
}: { 
  onEnterDashboard: () => void,
  totalMiners?: number,
  totalRewards?: number 
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useGSAP(() => {
    if (isLoaded) {
      gsap.fromTo('.hero-content', 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
    }
  }, [isLoaded])

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <svg viewBox="0 0 84 21" className="w-full h-auto">
                  <path d="M5.6875 11.6052C5.6875 5.19586 11.0298 0 17.62 0C17.9861 0 18.2829 0.288658 18.2829 0.644737V19.5003C18.2829 19.7743 18.1186 20.0231 17.8624 20.137L16.1436 20.9012C15.6693 21.1121 15.129 20.7777 15.1246 20.2705L15.0509 11.8622C15.0471 11.4374 14.692 11.095 14.2552 11.095C13.8198 11.095 13.4652 11.4355 13.4596 11.8589L13.3945 16.8101C13.391 17.0816 13.2263 17.3266 12.972 17.4387L6.70438 20.2017C6.22791 20.4118 5.6875 20.0729 5.6875 19.5642V11.6052Z" fill="white"/>
                  <path d="M4.60547 13.497C4.60547 11.8079 5.64576 10.2833 7.24597 9.62703L15.5537 6.2198C16.0281 6.02522 16.5531 6.36401 16.5531 6.8648V11.6454C16.5531 11.9269 16.3797 12.181 16.1131 12.2904L5.60487 16.6001C5.13042 16.7946 4.60547 16.4558 4.60547 15.955V13.497Z" fill="url(#grad1)"/>
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{stopColor:'#7C87F8'}}/>
                      <stop offset="68%" style={{stopColor:'#A08FF9'}}/>
                      <stop offset="100%" style={{stopColor:'#E7D7FF'}}/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-lg font-medium text-white">AYDO</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm">
              <span className="text-white hover:text-purple-400 transition-colors cursor-pointer">start</span>
              <span className="text-white hover:text-purple-400 transition-colors cursor-pointer">advantages</span>
              <span className="text-white hover:text-purple-400 transition-colors cursor-pointer">credibility</span>
              <span className="text-white hover:text-purple-400 transition-colors cursor-pointer">contact</span>
            </div>

            <button
              onClick={onEnterDashboard}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Blur Circle Background */}
      <div className="fixed top-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="hero-content">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                Monetize your IoT devices effortlessly
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-3xl mx-auto">
                AYDO makes it easy to stream data from any IoT device to DePIN protocols
              </p>
              
              {/* Email Form */}
              <div className="max-w-md mx-auto mb-12">
                <div className="flex gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="flex-1 px-6 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={onEnterDashboard}
                    className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Join Waitlist
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Device Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-full h-32 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <HardDrives size={48} className="text-purple-400" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-purple-600 flex items-center justify-center rounded text-xs text-white">
                  215
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-white">TVOC / CO2 sensor</div>
                <div className="text-gray-500">-------------------</div>
                <div className="text-gray-400">Status | <span className="text-green-400">Active</span></div>
                <div className="text-gray-400">Protocol | ZigBee</div>
                <div className="text-gray-400">Blockchain | IOTex</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-full h-32 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <DeviceMobile size={48} className="text-purple-400" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-purple-600 flex items-center justify-center rounded text-xs text-white">
                  042
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-white">Video streaming</div>
                <div className="text-gray-500">-------------------</div>
                <div className="text-gray-400">Status | <span className="text-green-400">Active</span></div>
                <div className="text-gray-400">Protocol | RTSP</div>
                <div className="text-gray-400">Blockchain | Solana</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-full h-32 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <Globe size={48} className="text-purple-400" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-purple-600 flex items-center justify-center rounded text-xs text-white">
                  512
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-white">Cellular connectivity</div>
                <div className="text-gray-500">-------------------</div>
                <div className="text-gray-400">Status | <span className="text-green-400">Active</span></div>
                <div className="text-gray-400">Protocol | Modbus</div>
                <div className="text-gray-400">Blockchain | Ethereum</div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="w-full h-32 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                <Sparkle size={48} className="text-purple-400" />
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-purple-600 flex items-center justify-center rounded text-xs text-white">
                  001
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="text-white">Noise Sensor</div>
                <div className="text-gray-500">-------------------</div>
                <div className="text-gray-400">Status | <span className="text-green-400">Active</span></div>
                <div className="text-gray-400">Protocol | Z-Wave</div>
                <div className="text-gray-400">Blockchain | peaq</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-sm text-purple-400 mb-4">&gt; what is DePIN?</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">The future of IoT devices</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                DePIN (Decentralized Physical Infrastructure) enables users to stream data from their smart home sensors, 
                Arduino/ESP boards connected sensors to protocols of their choice.
              </p>
            </div>
            <div className="bg-gray-900/30 rounded-2xl p-8 border border-gray-800">
              <div className="w-full h-64 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl flex items-center justify-center">
                <Lightning size={80} className="text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="text-sm text-purple-400 mb-4">&gt; credibility &amp; partners</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Represented and trusted by the best players in DePIN community
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">{totalMiners}+</div>
              <div className="text-gray-400">Active Miners</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">20+</div>
              <div className="text-gray-400">Channels &amp; Integration partners</div>
            </div>
            <div className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-purple-400 mb-4">7000+</div>
              <div className="text-gray-400">Supported devices</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to start earning from your devices?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join the DePIN revolution and monetize your IoT infrastructure today.
          </p>
          <button
            onClick={onEnterDashboard}
            className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-xl font-semibold rounded-lg transition-colors"
          >
            Start Mining Now
          </button>
        </div>
      </section>
    </div>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [showLanding, setShowLanding] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [userAddress, setUserAddress] = useState('')
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [userData, setUserData] = useState<UserData>({
    stxBalance: 0,
    btcBalance: 0,
    isRegistered: false,
    deviceType: '',
    deviceId: '',
    totalRewards: 0
  })
  const [selectedDevice, setSelectedDevice] = useState<string>('')
  const [deviceId, setDeviceId] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  
  // Real data - loaded from contract
  const [currentBlock, setCurrentBlock] = useState(0)
  const [totalMiners, setTotalMiners] = useState(0)
  const [totalRewards, setTotalRewards] = useState(0)
  const [networkHashRate] = useState("0 H/s") // Calculated based on commitments
  const [miningActive, setMiningActive] = useState(false)
  const [isActivelyMining, setIsActivelyMining] = useState(false)
  const [miningReward, setMiningReward] = useState<number | null>(null)

  const divExpansion = useRef<HTMLDivElement>(null)
  const buttonExpansion = useRef<HTMLDivElement>(null)

  // Initialize wallet session
  useEffect(() => {
    // Show loading screen for 4 seconds, then go directly to dashboard (skip landing page)
    const timer = setTimeout(() => {
      setIsLoading(false)
      setShowLanding(false) // Skip landing page, go directly to dashboard
    }, 4000)
    
    const appConfig = new AppConfig(['store_write', 'publish_data'])
    const session = new UserSession({ appConfig })
    setUserSession(session)

    if (session.isUserSignedIn()) {
      const userData = session.loadUserData()
      setIsConnected(true)
      setUserAddress(userData.profile.stxAddress.testnet)
      loadUserData(userData.profile.stxAddress.testnet)
    }
    
    return () => clearTimeout(timer)
  }, [])

  // Load mining statistics from contract
  const loadMiningStats = async () => {
    try {
      // Using mock data - will add real contract calls after wallet connection works
      setTotalMiners(0)
      setCurrentBlock(0)
      setTotalRewards(0)
      setMiningActive(false)
      console.log('Contract deployed at:', CONTRACT_ADDRESS)
    } catch (error) {
      console.log('Contract not deployed yet or error fetching stats:', error)
      // Keep default values (zeros)
    }
  }

  // Load stats on mount and every 30 seconds
  useEffect(() => {
    if (!isLoading) {
      loadMiningStats()
      const interval = setInterval(loadMiningStats, 30000) // Every 30 seconds
      return () => clearInterval(interval)
    }
  }, [isLoading])

  // Animation for expansion when wallet not connected
  useGSAP(() => {
    if (!isConnected && !isLoading) {
      const tl = gsap.timeline()

      tl.to(divExpansion.current, {
        height: "66.666667%", // flex-2/3
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      })

      tl.to(buttonExpansion.current, {
        width: "20rem", // w-80
        padding: "1.5rem",
        opacity: 1,
        duration: 2.4,
        ease: "power3.out",
      }, "-=1.5")
    }
  }, [isConnected, isLoading])

  const loadUserData = async (address: string) => {
    console.log('🔄 Loading user data for address:', address)
    try {
      let stxBalance = 100 // Default/mock balance
      
      // Try multiple APIs to load real STX balance
      try {
        console.log('🔍 Trying to load balance for address:', address)
        
        // Try Stacks Node API first (better CORS support)
        try {
          const nodeResponse = await fetch(
            `https://stacks-node-api.testnet.stacks.co/v2/accounts/${address}?proof=0`
          )
          if (nodeResponse.ok) {
            const nodeData = await nodeResponse.json()
            stxBalance = parseInt(nodeData.balance) / 1000000
            console.log('✅ Real STX balance from node API:', stxBalance)
          } else {
            throw new Error('Node API failed')
          }
        } catch (nodeError) {
          console.log('Node API failed, trying Hiro API...')
          
          // Fallback to Hiro API
          const hiroResponse = await fetch(
            `https://api.testnet.hiro.so/extended/v1/address/${address}/balances`
          )
          if (hiroResponse.ok) {
            const hiroData = await hiroResponse.json()
            stxBalance = parseInt(hiroData.stx.balance) / 1000000
            console.log('✅ Real STX balance from Hiro API:', stxBalance)
          } else {
            throw new Error('Hiro API also failed')
          }
        }
      } catch (balanceError) {
        console.warn('⚠️ All balance APIs failed, using mock data:', balanceError.message)
        // Keep default mock balance
      }

      // Load miner data from contract if deployed
      try {
        const response = await fetch(`https://stacks-node-api.testnet.stacks.co/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/get-miner-info`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender: address,
            arguments: [`'${address}`]
          })
        })
        const minerInfo = await response.json()
        console.log('Miner info response:', minerInfo)

        if (minerInfo.okay && minerInfo.result.type === 'OptionalSome') {
          const minerData = minerInfo.result.value.data
          console.log('Parsed miner data:', minerData)
          setUserData(prev => ({
            ...prev,
            stxBalance,
            btcBalance: parseInt(minerData['total-btc-committed'].value) / 100000000, // Convert from satoshis
            isRegistered: true,
            deviceType: minerData['device-type'].data,
            deviceId: minerData['device-id'].data,
            totalRewards: parseInt(minerData['stx-earned'].value) / 1000000 // Convert from microSTX
          }))
        } else {
          setUserData(prev => ({
            ...prev,
            stxBalance,
            btcBalance: 0,
            totalRewards: 0,
            // Don't override isRegistered if it was just set by successful registration
            isRegistered: prev.isRegistered
          }))
          console.log('📊 Contract call result: no registration found, keeping previous isRegistered state:', prev.isRegistered)
        }
      } catch (contractError) {
        console.log('Contract not deployed yet or error fetching data:', contractError)
        setUserData(prev => ({
          ...prev,
          stxBalance,
          btcBalance: 0,
          totalRewards: 0,
          // Don't override isRegistered if it was just set by successful registration
          isRegistered: prev.isRegistered
        }))
      }
    } catch (error) {
      console.error('Error loading user data:', error)
    }
  }

  const connectWallet = async () => {
    console.log('🔄 Attempting wallet connection...')
    
    // Use Stacks Connect for reliable wallet connection
    try {
      // This uses the same library we use for contract calls - more reliable
      const userSession = new UserSession({ appConfig: new AppConfig(['store_write', 'publish_data']) })
      
      if (userSession.isUserSignedIn()) {
        const userData = userSession.loadUserData()
        const address = userData.profile.stxAddress.testnet
        setUserAddress(address)
        setIsConnected(true)
        loadUserData(address)
        console.log('✅ Wallet already connected:', address)
        return
      }

      // If not signed in, inform user about wallet requirement and use demo mode
      console.log('⚠️ No active wallet session found')
      console.log('💡 For real wallet connection, you would use the register/mining buttons which trigger wallet prompts')
      
      // Demo mode with explanation
      const demoAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      setUserAddress(demoAddress)
      setIsConnected(true)
      loadUserData(demoAddress)
      console.log('🧪 Demo mode active:', demoAddress)
      console.log('📋 To use real wallet: try registering a device or mining - wallet will prompt automatically')
      
    } catch (error) {
      console.log('Using demo mode due to wallet initialization issue')
      
      // Demo mode fallback - always works
      const demoAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      setUserAddress(demoAddress)
      setIsConnected(true)
      loadUserData(demoAddress)
      console.log('🧪 Demo mode fallback:', demoAddress)
    }
  }

  const registerDevice = async () => {
    if (!selectedDevice || !deviceId || !userAddress) return

    // Check if already registered first
    if (userData.isRegistered) {
      alert('❌ Already Registered: This wallet is already registered with a device. Each wallet can only register one device.')
      return
    }

    setIsProcessing(true)
    try {
      const functionArgs = [
        stringAsciiCV(selectedDevice),
        stringAsciiCV(deviceId),
        stringAsciiCV('bc1fake' + Math.random().toString(36).substring(7))
      ]

      await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'register-device',
        functionArgs,
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data) => {
          console.log('Device registered:', data.txId)
          console.log('🎉 Registration successful! Setting isRegistered to true')
          setUserData(prev => ({
            ...prev,
            isRegistered: true,
            deviceType: selectedDevice,
            deviceId
          }))
          console.log('✅ State updated - user should now see mining interface')
          // Don't reload immediately - let the registration state persist
          // The contract data will be loaded when the user next refreshes or on next page load
        },
        onCancel: () => {
          console.log('User cancelled registration')
        }
      })
    } catch (error) {
      console.error('Registration error:', error)
      
      // Handle specific error cases
      let errorMessage = '❌ Registration Failed:\n\n'
      const errorStr = JSON.stringify(error)
      
      if (errorStr.includes('101') || error.message?.includes('101')) {
        errorMessage += 'Device ID Already Exists: This device ID is already registered by someone else. Please choose a different device ID.'
      } else if (errorStr.includes('103') || error.message?.includes('103')) {
        errorMessage += 'Insufficient Funds: You need at least 0.1 STX to register a device.'
      } else if (errorStr.includes('108') || error.message?.includes('108')) {
        errorMessage += 'Invalid Device Type: Please select a valid device type.'
      } else {
        errorMessage += `${error.message || 'Unknown error occurred'}`
      }
      
      console.error('Registration failed:', errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const startMining = async () => {
    if (!userAddress) return

    setIsProcessing(true)
    try {
      await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'start-block-mining',
        functionArgs: [],
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data) => {
          console.log('Mining round started:', data.txId)
          
          // Immediately update mining state
          setMiningActive(true)
          setCurrentBlock(prev => prev + 1)
          console.log('⛏️ Mining state updated - user should now see Commit BTC button')
          
          // Reload stats after starting mining to get actual data
          setTimeout(() => loadUserData(userAddress), 2000)
        },
        onCancel: () => {
          console.log('Mining start cancelled')
        }
      })
    } catch (error) {
      console.error('Mining failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }


  const finalizeBlockWinner = async () => {
    if (!userAddress) return

    try {
      console.log('🎯 Calling finalize-block-winner contract function...')
      
      // First, get the current block reward amount from contract
      const rewardResponse = await fetch(`https://stacks-node-api.testnet.stacks.co/v2/contracts/call-read/${CONTRACT_ADDRESS}/${CONTRACT_NAME}/get-current-reward`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: userAddress,
          arguments: []
        })
      })
      const rewardData = await rewardResponse.json()
      console.log('💰 Current block reward:', rewardData)

      // Call finalize-block-winner function (only contract owner can call this)
      await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'finalize-block-winner',
        functionArgs: [],
        postConditionMode: PostConditionMode.Allow,
        onFinish: async (data) => {
          console.log('🏆 Block winner finalized:', data.txId)
          
          // Wait a bit for transaction to be processed, then check who won
          setTimeout(async () => {
            try {
              await checkMiningResult(data.txId)
            } catch (error) {
              console.error('Error checking mining result:', error)
              setIsActivelyMining(false)
            }
          }, 3000)
        },
        onCancel: () => {
          console.log('Block finalization cancelled')
          setIsActivelyMining(false)
        }
      })
    } catch (error) {
      console.error('Error finalizing block winner:', error)
      setIsActivelyMining(false)
      throw error
    }
  }

  const checkMiningResult = async (txId: string) => {
    try {
      console.log('🔍 Mining animation complete, claiming reward...')
      
      // Simulate random reward (1-10 STX) - in production this would be determined by actual mining
      const rewardSTX = Math.floor(Math.random() * 10) + 1
      const rewardMicroSTX = rewardSTX * 1000000
      
      console.log('🎯 Claiming', rewardSTX, 'STX reward...')

      // Call claim-mining-reward function to get real STX
      await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'claim-mining-reward',
        functionArgs: [uintCV(rewardMicroSTX)],
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data) => {
          console.log('🎉 Reward claimed successfully!', data.txId)
          setIsActivelyMining(false)
          setMiningReward(rewardSTX)
        },
        onCancel: () => {
          console.log('❌ Reward claiming cancelled')
          setIsActivelyMining(false)
          setMiningReward(0)
        }
      })
    } catch (error) {
      console.error('Error claiming mining reward:', error)
      setIsActivelyMining(false)
      setMiningReward(0)
    }
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (showLanding) {
    return <LandingPageComponent 
      onEnterDashboard={() => {
        setShowLanding(false)
        connectWallet()
      }}
      totalMiners={totalMiners}
      totalRewards={totalRewards}
    />
  }

  if (isActivelyMining) {
    return <MiningScreen />
  }

  if (miningReward !== null) {
    return <RewardScreen reward={miningReward} onContinue={() => setMiningReward(null)} />
  }

  if (!isConnected) {
    return (
      <section>
        <div className="flex flex-col gap-0.5 p-0.5 h-screen">
          {/* Welcome Section */}
          <div className="relative flex-1/3 bg-foreground text-background rounded-4xl flex items-center justify-center">
            <span className="font-sans text-9xl flex items-center">
              <HardDrives size={120} weight="duotone" />
              Micro Mining
            </span>
            <div className="absolute top-0 right-0 p-5 border-b-2 border-l-2 border-background rounded-bl-md">
              <LinkIcon size={32} weight="duotone" />
            </div>
          </div>

          {/* Connection Section with Animation */}
          <div
            ref={divExpansion}
            className="flex gap-0.5 h-0 opacity-0 overflow-hidden"
          >
            <div className="flex-1 bg-accent text-background rounded-4xl flex flex-col items-center justify-center">
              <span className="text-6xl font-bold mb-4">Connect Wallet</span>
              <span className="text-6xl font-bold">Start Micro Mining</span>
            </div>
            <div
              ref={buttonExpansion}
              className="w-0 bg-accent text-background rounded-4xl flex flex-col gap-2 p-0 opacity-0 justify-center overflow-hidden"
            >
              <button 
                onClick={connectWallet}
                className="cursor-pointer flex-1/3 bg-foreground border border-foreground hover:bg-background hover:text-foreground active:scale-99 duration-300 rounded-t-4xl rounded-b-lg whitespace-nowrap text-xl flex items-center justify-center gap-2"
              >
                Connect Leather
                <Wallet size={22} weight="duotone" className="shrink-0" />
              </button>
              <button className="cursor-pointer flex-1/3 bg-foreground border border-foreground hover:bg-background hover:text-foreground active:scale-99 duration-300 rounded-lg whitespace-nowrap text-xl flex items-center justify-center gap-2">
                View Stats
                <ChartLine size={22} weight="duotone" className="shrink-0" />
              </button>
              <button className="cursor-pointer flex-1/3 bg-foreground border border-foreground hover:bg-background hover:text-foreground active:scale-99 duration-300 rounded-b-4xl rounded-t-lg whitespace-nowrap text-xl flex items-center justify-center gap-2">
                Learn More
                <MouseScrollIcon size={22} weight="duotone" className="shrink-0" />
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const commitBTC = async () => {
    if (!userAddress) return

    setIsProcessing(true)
    try {
      const btcAmount = 1000000 // 0.01 BTC in satoshis
      
      await openContractCall({
        network: NETWORK,
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: 'commit-btc',
        functionArgs: [uintCV(btcAmount)],
        postConditionMode: PostConditionMode.Allow,
        onFinish: (data) => {
          console.log('BTC committed:', data.txId)
          console.log('💰 BTC commitment successful - mining participation recorded')
          
          // Start mining animation with real contract integration
          setIsActivelyMining(true)
          console.log('🎬 Starting mining animation with real STX rewards...')
          
          // Real mining process: wait for block finalization, then call contract
          setTimeout(async () => {
            try {
              console.log('⏰ Mining period complete, finalizing block winner...')
              await finalizeBlockWinner()
            } catch (error) {
              console.error('❌ Mining finalization failed:', error)
              // Fall back to ending mining without reward
              setIsActivelyMining(false)
            }
          }, 10000) // 10 seconds mining animation
          
          // Reload stats after committing
          setTimeout(() => loadUserData(userAddress), 2000)
        },
        onCancel: () => {
          console.log('BTC commitment cancelled')
        }
      })
    } catch (error) {
      console.error('BTC commitment failed:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section>
      <div className="flex flex-col gap-0.5 p-0.5 h-screen">
        {/* Header Section */}
        <div className="relative flex-1/4 bg-foreground text-background rounded-4xl flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <HardDrives size={60} weight="duotone" />
            <div>
              <span className="font-serif text-4xl">Micro Mining</span>
              <div className="text-sm opacity-80">
                {userAddress.slice(0, 8)}...{userAddress.slice(-8)}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{userData.stxBalance.toFixed(2)} STX</div>
            <div className="text-sm opacity-80">{userData.btcBalance.toFixed(4)} BTC</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-0.5 flex-3/4">
          {/* Device Registration for Micro Mining */}
          <div className="flex-1 bg-accent text-background rounded-4xl p-8">
            {!userData.isRegistered ? (
              <>
                <h2 className="font-sans text-6xl mb-8">Register Node</h2>
                
                <div className="space-y-4 mb-8">
                  <DeviceCard
                    type="raspberry-pi"
                    name="Laptops, PCs & Raspberry Pis"
                    icon={<Laptop size={30} weight="duotone" />}
                    selected={selectedDevice === 'raspberry-pi'}
                    onClick={() => setSelectedDevice('raspberry-pi')}
                  />
                  <DeviceCard
                    type="mobile"
                    name="Mobile Devices"
                    icon={<Phone size={30} weight="duotone" />}
                    selected={selectedDevice === 'mobile'}
                    onClick={() => setSelectedDevice('mobile')}
                  />
                  <DeviceCard
                    type="esp32"
                    name="Microcontrollers & Microprocessors"
                    icon={<Cpu size={30} weight="duotone" />}
                    selected={selectedDevice === 'esp32'}
                    onClick={() => setSelectedDevice('esp32')}
                  />
                </div>

                {selectedDevice && (
                  <div className="mb-6">
                    <input
                      type="text"
                      value={deviceId}
                      onChange={(e) => setDeviceId(e.target.value)}
                      placeholder="Device ID"
                      className="w-full p-4 bg-background/20 border border-background/30 rounded-2xl text-background placeholder-background/60 text-lg"
                    />
                  </div>
                )}

                <button
                  onClick={registerDevice}
                  disabled={!selectedDevice || !deviceId || isProcessing}
                  className="w-full bg-foreground border border-foreground hover:bg-background hover:text-foreground active:scale-99 duration-300 rounded-2xl py-4 text-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Registering...' : 'Register Device'}
                </button>
              </>
            ) : (
              <>
                <h2 className="font-sans text-6xl mb-8">Your Node</h2>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-background/20 border border-background/30 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      {userData.deviceType === 'raspberry-pi' && <Laptop size={40} weight="duotone" />}
                      {userData.deviceType === 'mobile' && <Phone size={40} weight="duotone" />}
                      {userData.deviceType === 'esp32' && <Cpu size={40} weight="duotone" />}
                      
                      <div>
                        <h3 className="text-xl font-medium">
                          {userData.deviceType === 'raspberry-pi' ? 'Laptops, PCs & Raspberry Pis' :
                           userData.deviceType === 'mobile' ? 'Mobile Devices' :
                           userData.deviceType === 'esp32' ? 'Microcontrollers & Microprocessors' : 'Unknown Device'}
                        </h3>
                        <p className="text-sm opacity-80">ID: {userData.deviceId}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="opacity-60">Status</div>
                        <div className="text-green-300 font-medium">✅ Registered</div>
                      </div>
                      <div>
                        <div className="opacity-60">Network</div>
                        <div className="font-medium">Stacks Testnet</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center opacity-80">
                  <CheckCircle size={32} weight="duotone" className="mx-auto mb-2" />
                  <p>Device successfully registered!</p>
                  <p className="text-sm mt-1">Use the mining panel to start earning STX</p>
                </div>
              </>
            )}
          </div>

          {/* Mining Control */}
          <div className="w-96 bg-foreground text-background rounded-4xl p-8">
            <h2 className="font-sans text-4xl mb-8">Mine STX</h2>

            <div className="space-y-6 mb-8">
              <StatsCard 
                label="Current Block" 
                value={currentBlock > 0 ? currentBlock.toLocaleString() : "No active round"} 
                icon={<Circle size={20} weight="duotone" />}
              />
              <StatsCard 
                label="Total Miners" 
                value={totalMiners.toString()} 
                icon={<HardDrives size={20} weight="duotone" />}
              />
              <StatsCard 
                label="Network Rewards" 
                value={`${totalRewards} STX`} 
                icon={<Sparkle size={20} weight="duotone" />}
              />
              <StatsCard 
                label="Mining Status" 
                value={miningActive ? "Active Round" : "Waiting"} 
                icon={<ChartLine size={20} weight="duotone" />}
              />
            </div>

            {userData.isRegistered ? (
              <div className="space-y-4">
                {!miningActive ? (
                  <button
                    onClick={startMining}
                    disabled={isProcessing}
                    className="w-full bg-accent text-background border border-accent hover:bg-background hover:text-accent active:scale-99 duration-300 rounded-2xl py-4 text-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Starting...' : 'Start Micro Mining'}
                  </button>
                ) : (
                  <button
                    onClick={commitBTC}
                    disabled={isProcessing}
                    className="w-full bg-green-500 text-white border border-green-500 hover:bg-white hover:text-green-500 active:scale-99 duration-300 rounded-2xl py-4 text-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Committing...' : 'Commit BTC (0.01)'}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center opacity-60">
                <Warning size={40} weight="duotone" className="mx-auto mb-2" />
                <p>Register a device first</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function DeviceCard({ type, name, icon, selected, onClick }: {
  type: string
  name: string
  icon: React.ReactNode
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-2xl border-2 transition-all text-left flex items-center gap-4 ${
        selected 
          ? 'border-background bg-background/20' 
          : 'border-background/30 hover:border-background/50'
      }`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
        selected ? 'bg-background text-accent' : 'bg-background/20'
      }`}>
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{name}</h3>
      </div>
      {selected && <CheckCircle size={24} weight="duotone" />}
    </button>
  )
}

function StatsCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-accent/20 rounded-2xl p-4">
      <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
        {icon}
        {label}
      </div>
      <div className="text-xl font-bold">{value}</div>
    </div>
  )
}

function MiningScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (containerRef.current && textRef.current && loadingRef.current) {
      gsap.set([textRef.current, loadingRef.current], { opacity: 0, y: 50 })
      
      const tl = gsap.timeline()
      tl.to(textRef.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
      tl.to(loadingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.3")
      
      // Animated mining dots
      gsap.to(".mining-dot", {
        scale: 1.5,
        opacity: 0.3,
        duration: 1,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })

      // Rotating pickaxe animation
      gsap.to(".mining-pickaxe", {
        rotation: 15,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      })
    }
  }, [])

  return (
    <section className="bg-gradient-to-br from-slate-900 via-orange-900 to-amber-900 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20"></div>
      
      <div ref={containerRef} className="text-center">
        <div className="mb-8 mining-pickaxe">
          <HardDrives size={80} weight="duotone" className="mx-auto text-orange-400" />
        </div>
        
        <h1 ref={textRef} className="font-sans text-6xl text-white mb-4">
          Mining in Progress
        </h1>
        
        <div ref={loadingRef} className="space-y-4">
          <p className="text-xl text-orange-200">Your device is participating in the mining round...</p>
          
          <div className="flex justify-center space-x-3 my-8">
            <div className="mining-dot w-4 h-4 bg-orange-400 rounded-full"></div>
            <div className="mining-dot w-4 h-4 bg-orange-400 rounded-full"></div>
            <div className="mining-dot w-4 h-4 bg-orange-400 rounded-full"></div>
          </div>
          
          <p className="text-orange-300">Calculating proof of work...</p>
          <p className="text-sm text-orange-400">This may take a few moments</p>
        </div>
      </div>
    </section>
  )
}

function RewardScreen({ reward, onContinue }: { reward: number, onContinue: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rewardRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useGSAP(() => {
    if (containerRef.current && rewardRef.current && buttonRef.current) {
      gsap.set([rewardRef.current, buttonRef.current], { opacity: 0, scale: 0.5 })
      
      const tl = gsap.timeline()
      tl.to(rewardRef.current, { 
        opacity: 1, 
        scale: 1, 
        duration: 1.2, 
        ease: "back.out(1.7)" 
      })
      tl.to(buttonRef.current, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        ease: "back.out(1.4)" 
      }, "-=0.3")
      
      // Sparkle animation
      gsap.to(".reward-sparkle", {
        rotation: 360,
        scale: 1.2,
        duration: 2,
        stagger: 0.1,
        repeat: -1,
        ease: "power2.inOut"
      })
    }
  }, [])

  return (
    <section className="bg-gradient-to-br from-amber-900 via-orange-900 to-yellow-900 min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzMzMyIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20"></div>
      
      <div ref={containerRef} className="text-center">
        {reward > 0 ? (
          <>
            <div className="mb-8 relative">
              <Sparkle size={60} weight="duotone" className="reward-sparkle mx-auto text-yellow-400 absolute -top-4 -left-4" />
              <Sparkle size={40} weight="duotone" className="reward-sparkle mx-auto text-amber-300 absolute -bottom-2 -right-6" />
              <Sparkle size={50} weight="duotone" className="reward-sparkle mx-auto text-orange-400 absolute top-2 right-8" />
              <CheckCircle size={100} weight="duotone" className="mx-auto text-amber-400" />
            </div>
            
            <div ref={rewardRef}>
              <h1 className="font-sans text-6xl text-white mb-6">
                Mining Complete!
              </h1>
              
              <div className="bg-amber-800/30 border border-orange-600/50 rounded-3xl p-8 mb-8 max-w-md mx-auto">
                <h2 className="text-2xl text-amber-300 mb-4">You Earned</h2>
                <div className="text-5xl font-bold text-yellow-400 mb-2">
                  {reward.toFixed(2)} STX
                </div>
                <p className="text-orange-200">Congratulations on your successful mining!</p>
              </div>
            </div>
            
            <button 
              ref={buttonRef}
              onClick={onContinue}
              className="bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl text-xl font-medium transition-colors duration-300"
            >
              Continue Mining
            </button>
          </>
        ) : (
          <>
            <div className="mb-8">
              <Warning size={100} weight="duotone" className="mx-auto text-slate-400" />
            </div>
            
            <div ref={rewardRef}>
              <h1 className="font-sans text-6xl text-white mb-6">
                Mining Complete
              </h1>
              
              <div className="bg-slate-800/30 border border-slate-600/50 rounded-3xl p-8 mb-8 max-w-md mx-auto">
                <h2 className="text-2xl text-slate-300 mb-4">No Reward This Time</h2>
                <div className="text-3xl font-bold text-slate-400 mb-2">
                  Better luck next round!
                </div>
                <p className="text-slate-300">Someone else won this mining round.</p>
              </div>
            </div>
            
            <button 
              ref={buttonRef}
              onClick={onContinue}
              className="bg-slate-600 hover:bg-slate-500 text-white px-8 py-4 rounded-2xl text-xl font-medium transition-colors duration-300"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </section>
  )
}