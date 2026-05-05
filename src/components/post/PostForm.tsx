'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

import { useCompaniesStore } from '@/store/companiesStore';

import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { format } from 'date-fns';
import { Post } from '@/types';

interface Props {
  onSubmit: (post: Omit<Post, 'id'>) => void;
  initValue?: Post;
}

export default function PostForm({ onSubmit, initValue }: Props) {
  const companies = useCompaniesStore((store) => store.companies);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState(initValue?.title || '');
  const [company, setCompany] = useState(initValue?.resourceUid || '');
  const [date, setDate] = useState<Date>(
    initValue?.dateTime ? new Date(initValue.dateTime) : new Date()
  );
  const [content, setContent] = useState(initValue?.content || '');

  const handleSubmit = async () => {
    if (title.trim() === '') return;
    if (company.trim() === '') return;
    if (date === undefined) return;
    if (content.trim() === '') return;

    try {
      setIsSubmitting(true);

      await onSubmit({
        title,
        resourceUid: company,
        dateTime: format(date, 'yyyy-MM'),
        content,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='mx-auto flex min-h-100 max-w-125 flex-col gap-2 rounded-xl border p-5'>
      <Field>
        <FieldLabel htmlFor='title'>제목</FieldLabel>
        <Input
          id='title'
          autoComplete='off'
          placeholder='제목을 입력해주세요.'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor='resourceUid'>회사</FieldLabel>
        <select
          name='resourceUid'
          className='h-8 rounded-lg border px-2 text-sm'
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value=''>회사를 선택해주세요.</option>
          {companies.map((company) => (
            <option value={company.id} key={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </Field>
      <Field>
        <FieldLabel htmlFor='dateTime'>날짜</FieldLabel>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              id='date-picker-simple'
              className='justify-start font-normal'
            >
              {date ? (
                format(date, 'yyyy-MM')
              ) : (
                <span>날짜를 선택해주세요.</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              captionLayout='dropdown'
              selected={date}
              onSelect={setDate}
              defaultMonth={date}
              locale={ko}
              required
            />
          </PopoverContent>
        </Popover>
      </Field>
      <Field>
        <FieldLabel htmlFor='content'>내용</FieldLabel>
        <Textarea
          id='content'
          className='h-50 resize-none'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Field>
      <Button
        className='cursor-pointer'
        disabled={isSubmitting}
        size={'lg'}
        onClick={handleSubmit}
      >
        {initValue ? '수정' : '등록'}
      </Button>
    </div>
  );
}
