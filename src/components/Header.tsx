import React, { useState } from 'react';
import { Button } from './ui/Button';
import { HelpCircle } from 'lucide-react';
import { InfoModal } from './InfoModal';
import * as Select from '@radix-ui/react-select';
import { useI18n } from '../i18n/I18nProvider';

export const Header: React.FC = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const { t, lang, setLang } = useI18n();

  return (
    <>
      <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🍌</div>
            <h1 className="text-xl font-semibold text-gray-100 hidden md:block">
              {t('header.title.full')}
            </h1>
            <h1 className="text-xl font-semibold text-gray-100 md:hidden">
              {t('header.title.short')}
            </h1>
          </div>
          <div className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
            {t('header.version')}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Select.Root value={lang} onValueChange={(value) => setLang(value as any)}>
            <Select.Trigger className="inline-flex items-center px-2 h-8 bg-gray-800 text-gray-200 rounded border border-gray-700 text-xs">
              <Select.Value placeholder={t('lang.switch')} />
            </Select.Trigger>
            <Select.Portal>
              <Select.Content className="z-50 bg-gray-900 border border-gray-700 rounded shadow-lg">
                <Select.Viewport className="p-1">
                  <Select.Item value="en" className="px-2 py-1 text-sm text-gray-200 rounded hover:bg-gray-800 cursor-pointer">
                    <Select.ItemText>{t('lang.en')}</Select.ItemText>
                  </Select.Item>
                  <Select.Item value="zh" className="px-2 py-1 text-sm text-gray-200 rounded hover:bg-gray-800 cursor-pointer">
                    <Select.ItemText>{t('lang.zh')}</Select.ItemText>
                  </Select.Item>
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowInfoModal(true)}
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </header>
      
      <InfoModal open={showInfoModal} onOpenChange={setShowInfoModal} />
    </>
  );
};
