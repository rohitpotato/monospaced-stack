import React from 'react'
import { colors } from '../app/__new/theme'
import Typography from './typography'
import Window from './window'

const AuthorProfile: React.FC = () => {
  return (
    <Window title="USER_ID:potat" className="mb-8">
      <div className="flex items-center space-x-4">
        <img
          src="https://avatars.githubusercontent.com/u/47269217?v=4"
          alt="rohitpotato"
          className={`w-24 h-24 border-2 border-${colors.border}`}
        />
        <div>
          <Typography variant="h3">rohitpotato</Typography>
          <Typography variant="body" color="textMuted" className="text-md">
            i just build stuff. currently exploring infrastructure while being a frontend engineer at my day job.
          </Typography>
        </div>
      </div>
    </Window>
  )
}

export default AuthorProfile
